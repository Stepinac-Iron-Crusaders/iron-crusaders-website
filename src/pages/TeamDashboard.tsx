import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatedPage } from "../components/AnimatedPage";
import { supabase } from "../lib/supabaseClient";

type User = {
  email?: string;
};

type TeamEvent = {
  id: number;
  title: string;
  description: string | null;
  location: string | null;
  start_time: string;
};

export default function TeamDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [schedule, setSchedule] = useState<TeamEvent[]>([]);

  const [loadingSchedule, setLoadingSchedule] = useState(true);
  const [scheduleError, setScheduleError] = useState("");

  const [loggingOut, setLoggingOut] = useState(false);

  // --------------------------------------------------
  // Get logged-in user
  // --------------------------------------------------

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setUser({
          email: user.email,
        });
      }
    };

    getUser();
  }, []);

  // --------------------------------------------------
  // Load team schedule from Supabase
  // --------------------------------------------------

  useEffect(() => {
    const loadSchedule = async () => {
      setLoadingSchedule(true);
      setScheduleError("");

      const now = new Date().toISOString();

      const { data, error } = await supabase
        .from("team_schedule")
        .select("id, title, description, location, start_time")
        .gte("start_time", now)
        .order("start_time", { ascending: true });

      if (error) {
        console.error("Failed to load team schedule:", error);
        setScheduleError("Unable to load the team schedule.");
        setLoadingSchedule(false);
        return;
      }

      setSchedule(data ?? []);
      setLoadingSchedule(false);
    };

    loadSchedule();
  }, []);

  // --------------------------------------------------
  // Logout
  // --------------------------------------------------

  const handleLogout = async () => {
    setLoggingOut(true);

    await supabase.auth.signOut();

    window.location.href = "#/team/portal/login";
  };

  // --------------------------------------------------
  // Format event date
  // --------------------------------------------------

  const formatEventDate = (dateString: string) => {
    const date = new Date(dateString);

    return {
      month: date
        .toLocaleDateString("en-US", {
          month: "short",
        })
        .toUpperCase(),

      day: date.toLocaleDateString("en-US", {
        day: "2-digit",
      }),

      weekday: date
        .toLocaleDateString("en-US", {
          weekday: "long",
        })
        .toUpperCase(),
    };
  };

  // --------------------------------------------------
  // Format event time
  // --------------------------------------------------

  const formatEventTime = (dateString: string) => {
    const date = new Date(dateString);

    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  // --------------------------------------------------
  // Render
  // --------------------------------------------------

  return (
    <AnimatedPage>
      <>
        {/* Header */}
        <section className="relative overflow-hidden border-b border-zinc-800 bg-zinc-950">
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-red-600/40 to-transparent"
          />

          <div className="mx-auto max-w-[1280px] px-4 py-12 lg:px-8 lg:py-16">
            <div className="flex items-center justify-between gap-6">
              <div>
                <div className="mb-3 flex items-center gap-3">
                  <span className="h-px w-8 bg-red-600" />

                  <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-red-500">
                    Iron Crusaders
                  </span>
                </div>

                <h1 className="text-4xl font-black uppercase tracking-[-0.03em] text-white sm:text-5xl">
                  Team Portal
                </h1>

                <p className="mt-3 text-sm text-zinc-500">
                  Welcome{user?.email ? `, ${user.email}` : ""}.
                </p>
              </div>

              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="border border-zinc-700 bg-zinc-900 px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-zinc-300 transition-colors hover:border-zinc-600 hover:bg-zinc-800 hover:text-white disabled:opacity-50"
              >
                {loggingOut ? "Signing Out..." : "Sign Out"}
              </button>
            </div>
          </div>
        </section>

        {/* Dashboard */}
        <section className="bg-zinc-900">
          <div className="mx-auto max-w-[1280px] px-4 py-12 lg:px-8 lg:py-14">
            <div className="grid gap-8 lg:grid-cols-[1.5fr_0.8fr]">
              {/* Schedule */}
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl font-black uppercase tracking-[-0.02em] text-white">
                    Team Schedule
                  </h2>

                  <p className="mt-2 text-sm text-zinc-500">
                    Upcoming meetings, build sessions, and events.
                  </p>
                </div>

                {/* Loading */}
                {loadingSchedule && (
                  <div className="border border-zinc-800 bg-zinc-950 p-6">
                    <p className="font-mono text-xs uppercase tracking-[0.12em] text-zinc-600">
                      Loading schedule...
                    </p>
                  </div>
                )}

                {/* Error */}
                {!loadingSchedule && scheduleError && (
                  <div className="border border-red-900/60 bg-red-950/20 p-6">
                    <p className="font-mono text-xs uppercase tracking-[0.12em] text-red-400">
                      {scheduleError}
                    </p>

                    <button
                      onClick={() => window.location.reload()}
                      className="mt-4 border border-red-900/60 px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-red-400 transition-colors hover:bg-red-950/40"
                    >
                      Try Again
                    </button>
                  </div>
                )}

                {/* No upcoming events */}
                {!loadingSchedule &&
                  !scheduleError &&
                  schedule.length === 0 && (
                    <div className="border border-zinc-800 bg-zinc-950 p-8 text-center">
                      <p className="font-mono text-xs uppercase tracking-[0.12em] text-zinc-600">
                        No upcoming events.
                      </p>

                      <p className="mt-2 text-sm text-zinc-700">
                        Check back later for new team events.
                      </p>
                    </div>
                  )}

                {/* Events */}
                {!loadingSchedule &&
                  !scheduleError &&
                  schedule.length > 0 && (
                    <div className="space-y-3">
                      {schedule.map((event) => {
                        const date = formatEventDate(event.start_time);
                        const time = formatEventTime(event.start_time);

                        return (
                          <div
                            key={event.id}
                            className="flex gap-5 border border-zinc-800 bg-zinc-950 p-5 transition-colors hover:border-zinc-700"
                          >
                            {/* Date */}
                            <div className="flex w-20 shrink-0 flex-col items-center justify-center border-r border-zinc-800 pr-5">
                              <span className="font-mono text-xs font-bold text-red-500">
                                {date.month} {date.day}
                              </span>

                              <span className="mt-1 font-mono text-[9px] uppercase text-zinc-600">
                                {date.weekday}
                              </span>
                            </div>

                            {/* Details */}
                            <div className="min-w-0">
                              <h3 className="text-sm font-bold uppercase tracking-wide text-white">
                                {event.title}
                              </h3>

                              <p className="mt-2 text-xs text-zinc-500">
                                {time}
                              </p>

                              {event.location && (
                                <p className="mt-1 font-mono text-[10px] uppercase tracking-wide text-zinc-700">
                                  {event.location}
                                </p>
                              )}

                              {event.description && (
                                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-600">
                                  {event.description}
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
              </div>

              {/* Quick links */}
              <div>
                <h2 className="text-2xl font-black uppercase tracking-[-0.02em] text-white">
                  Quick Access
                </h2>

                <div className="mt-6 space-y-3">
                  <Link
                    to="/events"
                    className="block border border-zinc-800 bg-zinc-950 p-5 transition-colors hover:border-zinc-700 hover:bg-zinc-900"
                  >
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-red-500">
                      Public
                    </span>

                    <h3 className="mt-2 text-sm font-bold uppercase text-white">
                      Events →
                    </h3>
                  </Link>

                  <Link
                    to="/resources"
                    className="block border border-zinc-800 bg-zinc-950 p-5 transition-colors hover:border-zinc-700 hover:bg-zinc-900"
                  >
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-red-500">
                      Resources
                    </span>

                    <h3 className="mt-2 text-sm font-bold uppercase text-white">
                      Team Resources →
                    </h3>
                  </Link>

                  <Link
                    to="/team"
                    className="block border border-zinc-800 bg-zinc-950 p-5 transition-colors hover:border-zinc-700 hover:bg-zinc-900"
                  >
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-red-500">
                      Team
                    </span>

                    <h3 className="mt-2 text-sm font-bold uppercase text-white">
                      Team Page →
                    </h3>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    </AnimatedPage>
  );
}
