import { formatUSD } from "./budget";

export type FundraisingSource = {
  id: string;
  label: string;
  /** Cash actually received. */
  raised: number;
  /** Committed but not yet paid. */
  pledged: number;
  accent: string;
};

export type FundraisingMilestone = {
  label: string;
  amount: number;
  reached: boolean;
};

/**
 * Season fundraising target and breakdown.
 *
 * `raised` here is the fallback used when the live Google Sheet is
 * unreachable or has not been connected yet. Once
 * VITE_FUNDRAISING_SHEET_ID is set and the sheet is published, the numbers
 * come from the sheet instead.
 */
export const FUNDRAISING_TARGET = 27500;

export const FUNDRAISING_SOURCES: FundraisingSource[] = [
  { id: "corporate", label: "Corporate Sponsors", raised: 11500, pledged: 4500, accent: "bg-red-500" },
  { id: "inhouse", label: "In-House Sponsors", raised: 6200, pledged: 1800, accent: "bg-orange-500" },
  { id: "grants", label: "Grants & Foundations", raised: 4800, pledged: 3000, accent: "bg-blue-500" },
  { id: "events", label: "Fundraising Events", raised: 3100, pledged: 400, accent: "bg-emerald-500" },
  { id: "alumni", label: "Alumni & Community", raised: 2400, pledged: 600, accent: "bg-violet-500" },
];

export const FUNDRAISING_MILESTONES: FundraisingMilestone[] = [
  { label: "Robot Chassis Paid", amount: 5000, reached: true },
  { label: "Full Electronics Order", amount: 10000, reached: true },
  { label: "Hotel For Each Event", amount: 15000, reached: true },
  { label: "Championship Travel", amount: 20000, reached: false },
  { label: "Full Season Covered", amount: 27500, reached: false },
];

/**
 * Google Sheets is read through the public CSV export endpoint, which needs
 * no API key and no service account. The sheet must be shared as
 * "Anyone with the link — Viewer".
 *
 * Set VITE_FUNDRAISING_SHEET_ID to the id portion of the sheet URL:
 * https://docs.google.com/spreadsheets/d/<THIS_PART>/edit
 */
export const FUNDRAISING_SHEET_ID =
  (import.meta.env.VITE_FUNDRAISING_SHEET_ID as string | undefined)?.trim() || "";

export const csvUrlFor = (sheetId: string, gid = 0) =>
  `https://docs.google.com/spreadsheets/d/${encodeURIComponent(sheetId)}/gviz/tq?tqx=out:csv&gid=${gid}`;

/** Minimal RFC-4180 CSV row splitter that respects quoted fields. */
function parseCsvRows(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    if (inQuotes) {
      if (char === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += char;
      }
      continue;
    }

    if (char === '"') {
      inQuotes = true;
    } else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else if (char !== "\r") {
      field += char;
    }
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  return rows.filter((r) => r.some((cell) => cell.trim() !== ""));
}

const parseMoney = (raw: string): number => {
  const cleaned = raw.replace(/[^0-9.-]/g, "");
  const value = Number.parseFloat(cleaned);
  return Number.isFinite(value) ? value : 0;
};

/**
 * Pulls fundraising rows from a published Google Sheet.
 *
 * Expected columns (header row is required and matched by name):
 *   Source | Raised | Pledged
 *
 * A "Summary" row with Source === "TOTAL" is ignored — totals are computed
 * here so they can never drift from the rows above them.
 */
export async function fetchFundraising(
  sheetId: string,
  signal?: AbortSignal,
): Promise<FundraisingSource[]> {
  const res = await fetch(csvUrlFor(sheetId), { signal, redirect: "follow" });

  if (!res.ok) {
    throw new Error(`Google Sheets responded ${res.status}`);
  }

  const rows = parseCsvRows(await res.text());
  if (rows.length < 2) throw new Error("Sheet has no data rows");

  const header = rows[0].map((h) => h.trim().toLowerCase());
  const sourceIdx = header.findIndex((h) => h === "source" || h === "label");
  const raisedIdx = header.findIndex((h) => h === "raised" || h === "amount");
  const pledgedIdx = header.findIndex((h) => h === "pledged");

  if (sourceIdx === -1 || raisedIdx === -1) {
    throw new Error("Sheet needs Source and Raised columns");
  }

  const accents = FUNDRAISING_SOURCES.map((s) => s.accent);
  const parsed: FundraisingSource[] = [];

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const label = (row[sourceIdx] ?? "").trim();
    if (!label || label.toUpperCase() === "TOTAL") continue;

    parsed.push({
      id: label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || `row-${i}`,
      label,
      raised: parseMoney(row[raisedIdx] ?? ""),
      pledged: pledgedIdx === -1 ? 0 : parseMoney(row[pledgedIdx] ?? ""),
      accent: accents[parsed.length % accents.length],
    });
  }

  if (!parsed.length) throw new Error("Sheet contained no usable rows");
  return parsed;
}

export type FundraisingTotals = {
  raised: number;
  pledged: number;
  total: number;
  remaining: number;
  progress: number;
};

export function fundraisingTotals(sources: FundraisingSource[], target: number): FundraisingTotals {
  const raised = sources.reduce((sum, s) => sum + s.raised, 0);
  const pledged = sources.reduce((sum, s) => sum + s.pledged, 0);
  const total = raised + pledged;

  return {
    raised,
    pledged,
    total,
    remaining: Math.max(0, target - total),
    progress: target > 0 ? Math.min(100, (total / target) * 100) : 0,
  };
}

export const milestoneLabel = (m: FundraisingMilestone, totals: FundraisingTotals) =>
  m.reached || totals.total >= m.amount ? "Funded" : formatUSD(m.amount - totals.total) + " to go";
