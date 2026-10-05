import { ROSTER } from "./team";

export type Captain = {
  n: string;
  yr: string;
  roles: string[];
  focus: string;
};

export const CAPTAINS: Captain[] = [
  {
    n: "Joseph Alex",
    yr: "Sophomore",
    roles: ["Co-Captain", "Building/Design Co-Lead"],
    focus:
      "Owns season timeline, design reviews, pit operations, and robot system design.",
  },
  {
    n: "Subash Jonnalagadda",
    yr: "Junior",
    roles: ["Co-Captain", "Building/Design Co-Lead"],
    focus:
      "Owns season timeline, design reviews, pit operations, and robot construction.",
  },
];

export type Lead = {
  n: string;
  role: string;
};

export type Branch = {
  id: string;
  name: string;
  /** Reported subteam size. */
  members: number;
  leads: Lead[];
  desc: string;
  accentBar: string;
  chip: string;
  leadText: string;
  dot: string;
};

export const BRANCHES: Branch[] = [
  {
    id: "build",
    name: "Building/Design",
    members: 23,
    leads: [
      { n: "Subash Jonnalagadda", role: "Co-Lead" },
      { n: "Joseph Alex", role: "Co-Lead" },
    ],
    desc: "Designs and builds every robot subsystem — chassis, mechanisms, bumpers, and the electrical layout.",
    accentBar: "bg-red-500",
    chip: "border-red-900/60 bg-red-950/30 text-red-400",
    leadText: "text-red-400",
    dot: "bg-red-500",
  },
  {
    id: "coding",
    name: "Coding",
    members: 13,
    leads: [
      { n: "Julian Reiff", role: "Co-Lead" },
      { n: "Joseph Uthuppan", role: "Co-Lead" },
      { n: "Robert Geib", role: "Co-Lead" },
    ],
    desc: "Autonomous routines, computer vision, and closed-loop robot control.",
    accentBar: "bg-blue-500",
    chip: "border-blue-900/60 bg-blue-950/30 text-blue-400",
    leadText: "text-blue-400",
    dot: "bg-blue-500",
  },
  {
    id: "finance",
    name: "Finance",
    members: 11,
    leads: [
      { n: "Mathew Kulapurathazhe", role: "Co-Lead" },
      { n: "Thomas Munchoff", role: "Co-Lead" },
    ],
    desc: "Creates and implements the team's business and financial plan.",
    accentBar: "bg-emerald-500",
    chip: "border-emerald-900/60 bg-emerald-950/30 text-emerald-400",
    leadText: "text-emerald-400",
    dot: "bg-emerald-500",
  },
  {
    id: "media",
    name: "Media & Marketing",
    members: 11,
    leads: [{ n: "Oisin Stack", role: "Marketing Lead" }],
    desc: "Outreach, sponsor deliverables, social media, and team media production.",
    accentBar: "bg-orange-500",
    chip: "border-orange-900/60 bg-orange-950/30 text-orange-400",
    leadText: "text-orange-400",
    dot: "bg-orange-500",
  },
];

const TEAM_KEYWORDS: Record<string, string[]> = {
  build: ["Design/Build Team", "Design/Building Team"],
  coding: ["Coding Team"],
  finance: ["Finance Team"],
  media: ["Marketing/Social Media Team"],
};

/** Roster members assigned to a branch, derived from each student's role string. */
export function branchMembers(branchId: string, limit = 4): string[] {
  const keys = TEAM_KEYWORDS[branchId] ?? [];
  return ROSTER.filter((m) => keys.some((k) => m.role.includes(k)))
    .map((m) => m.n)
    .slice(0, limit);
}