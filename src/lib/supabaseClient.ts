import { createClient } from "@supabase/supabase-js";

export type Role = "admin" | "team_lead" | "member";

export type Profile = {
  id: string;
  email: string;
  full_name: string | null;
  role: Role;
  is_active: boolean;
  created_at: string;
  updated_at: string | null;
};

export type Team = {
  id: number;
  name: string;
  description: string | null;
  lead_id: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string | null;
};

export type UserTeam = Team & {
  role_in_team: string;
  joined_at: string | null;
};

export type Task = {
  id: number;
  title: string;
  description: string | null;
  status: "todo" | "in_progress" | "done";
  priority: "low" | "medium" | "high" | "urgent";
  due_date: string | null;
  team_id: number | null;
  assigned_by: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string | null;
};

export type TaskAssignment = {
  id: number;
  task_id: number;
  member_id: string;
  assignee_id: string | null;
  completed: boolean;
  completed_at: string | null;
  assigned_at: string | null;
};

// The Supabase client is initialised from environment variables. The
// publishable (anon) key is safe to ship to the browser — it CANNOT bypass
// Row Level Security. The service_role key never appears in the frontend.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;

export const supabase =
  supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey)
    : createClient("https://placeholder.supabase.co", "placeholder-key");

export const isConfigured = !!(supabaseUrl && supabaseKey);
