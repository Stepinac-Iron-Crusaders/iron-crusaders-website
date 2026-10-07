# Budget & Fundraising Tracker

Two trackers on one page (`/budget`), plus a compact summary on the home page.

- **Budget** — fixed figures in code. No external service, no fetch.
- **Fundraising** — reads live from a published Google Sheet, with local
  fallback figures so the page never renders empty.

## The Google Sheet

Create a Google Sheet with three columns in the first row:

| Source | Raised | Pledged |
| ------ | ------ | ------- |
| Corporate Sponsors | 11500 | 4500 |
| In-House Sponsors | 6200 | 1800 |
| Grants & Foundations | 4800 | 3000 |
| Fundraising Events | 3100 | 400 |
| Alumni & Community | 2400 | 600 |

A starter file is at `docs/fundraising-sheet-template.csv` — open it in Sheets
via File → Import, or just type the rows in.

Column rules:

- Header names are matched case-insensitively. `Source` (or `Label`) and
  `Raised` (or `Amount`) are required; `Pledged` is optional.
- Money may be plain (`11500`) or formatted (`$11,500`). Both parse.
- Add rows freely — one row per funding source. Totals are computed on the
  site, so never add your own `TOTAL` row. If one exists it is ignored.

## Connect it to the site

1. In the sheet, click **Share → General access → Anyone with the link →
   Viewer**, then copy the link.

   The site reads through the public CSV export endpoint, which needs no API
   key and no service account. Link sharing is all that's required.

2. Take the id out of the URL:

   ```
   https://docs.google.com/spreadsheets/d/1AbC...xYz/edit
                                        └──── this ────┘
   ```

3. Add it as a repository secret and as a local env var:

   **GitHub:** Settings → Secrets and variables → Actions → New repository
   secret, name `VITE_FUNDRAISING_SHEET_ID`, paste the id. The deploy
   workflow already passes this through to the build.

   **Local:** add to `.env.local`:

   ```
   VITE_FUNDRAISING_SHEET_ID=1AbC...xYz
   ```

4. Push. The next deploy picks it up.

## What the status chip means

The badge next to the fundraising heading reports where the numbers came
from, so a stale figure is never mistaken for a current one:

| Label | Meaning |
| --- | --- |
| Live from Google Sheets | Sheet fetched successfully |
| Syncing sheet… | Fetch in flight |
| Sheet unreachable | Fetch failed; showing local figures |
| Static figures | No sheet id configured yet |

Failures are non-fatal by design. If the sheet is private, deleted, or the
network blocks the request, the page falls back to the numbers in
`src/data/fundraising.ts` and logs the reason to the console.

## Where the numbers live

| What | File |
| --- | --- |
| Budget categories, allocation, spend | `src/data/budget.ts` |
| Fundraising target, milestones, fallback figures | `src/data/fundraising.ts` |
| Sheet fetch + CSV parsing | `src/data/fundraising.ts` |
| Full page | `src/pages/Budget.tsx` |
| Home page summary | `src/components/HomeFinanceWidget.tsx` |

The budget in `src/data/budget.ts` is placeholder data for the 2027 season.
Replace `spent` with your real running totals as the season progresses.

The season fundraising goal is `FUNDRAISING_TARGET` in
`src/data/fundraising.ts`, currently `$27,500`.
