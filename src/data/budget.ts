export type BudgetCategory = {
  id: string;
  label: string;
  /** Allocated dollars for the season. */
  allocated: number;
  /** What we actually expect to spend. */
  planned: number;
  /** Running total of money spent so far. */
  spent: number;
  /** Short explanation shown under the label. */
  note: string;
  accent: string;
};

export type BudgetPhase = {
  label: string;
  caption: string;
  /** Percent of total budget committed by the end of this phase. */
  share: number;
};

/**
 * Season budget. This is intentionally fixed and not fetched from any
 * external service — the numbers here are the team's own allocation and
 * change only when we edit this file.
 */
export const SEASON = "2027" as const;

export const BUDGET_TOTAL = 27500;

export const BUDGET_CATEGORIES: BudgetCategory[] = [
  {
    id: "materials",
    label: "Materials & Parts",
    allocated: 9000,
    planned: 8600,
    spent: 5240,
    note: "Aluminum, polycarbonate, fasteners, bearings, and raw stock for the chassis and mechanisms.",
    accent: "bg-red-500",
  },
  {
    id: "electronics",
    label: "Electronics",
    allocated: 5500,
    planned: 5200,
    spent: 4180,
    note: "RoboRIO, PDUs, motor controllers, sensors, wiring, and the batteries we cycle through events.",
    accent: "bg-orange-500",
  },
  {
    id: "travel",
    label: "Travel & Events",
    allocated: 7000,
    planned: 6800,
    spent: 3120,
    note: "Registration, team lodging, van fuel, and meals across the regional and championship schedule.",
    accent: "bg-blue-500",
  },
  {
    id: "tools",
    label: "Tools & Machine Time",
    allocated: 3000,
    planned: 2800,
    spent: 1460,
    note: "Mill and lathe consumables, cutting fluid, replacement tooling, and shop supplies.",
    accent: "bg-emerald-500",
  },
  {
    id: "awards",
    label: "Awards & Uniforms",
    allocated: 1800,
    planned: 1800,
    spent: 980,
    note: "Team apparel, engraved awards, banners, and the pit materials we show up with every year.",
    accent: "bg-violet-500",
  },
  {
    id: "outreach",
    label: "Outreach & Media",
    allocated: 1200,
    planned: 1200,
    spent: 420,
    note: "Demo robots, workshop supplies, filming gear, and printing for community events.",
    accent: "bg-pink-500",
  },
];

export const BUDGET_PHASES: BudgetPhase[] = [
  { label: "Kickoff", caption: "Design review and ordering begins", share: 20 },
  { label: "Build", caption: "Fabrication and wiring", share: 65 },
  { label: "Pre-Event", caption: "Drive practice and pit prep", share: 90 },
  { label: "Competition", caption: "Travel, spares, and repairs", share: 100 },
];

export const budgetTotals = () => {
  const allocated = BUDGET_CATEGORIES.reduce((sum, c) => sum + c.allocated, 0);
  const planned = BUDGET_CATEGORIES.reduce((sum, c) => sum + c.planned, 0);
  const spent = BUDGET_CATEGORIES.reduce((sum, c) => sum + c.spent, 0);

  return {
    allocated,
    planned,
    spent,
    remaining: allocated - spent,
    used: allocated > 0 ? (spent / allocated) * 100 : 0,
  };
};

export const formatUSD = (value: number, opts?: { cents?: boolean }) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: opts?.cents ? 2 : 0,
    maximumFractionDigits: opts?.cents ? 2 : 0,
  }).format(value);
