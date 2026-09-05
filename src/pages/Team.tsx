import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatedPage } from "../components/AnimatedPage";
import { supabase } from "../lib/supabase";

type ScheduleItem = {
  id: number;
  title: string;
  description: string | null;
  location: string | null;
  start_time: string;
  end_time: string | null;
};

type Announcement = {
  id: number;
  title: string;
  body: string;
  created_at: string;
};

export default function Team() {
  const navigate = useNavigate();

  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadTeamPage = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        navigate("/team/login", { replace: true });
        return;
      }

      if (mounted) {
        setEmail(user.email ?? "");
      }

      const [scheduleResult, announcementsResult] = await Promise.all([
        supabase
          .from("team_schedule")
          .select("*")
          .order("start_time", { ascending: true }),

        supabase
          .from("team_announcements")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(5),
      ]);

      if (scheduleResult.error) {
        console.error(scheduleResult.error);
      }

      if (announcementsResult.error) {
        console.error(announcementsResult.error);
      }

      if (mounted) {
        setSchedule(scheduleResult.data ?? []);
        setAnnouncements(announcementsResult.data ?? []);
        setLoading(false);
      }
    };

    loadTeamPage();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event: any, session: any) => {
      if (event === "SIGNED_OUT" || !session) {
        navigate("/team/login", { replace: true });
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [navigate]);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate("/team/login", { replace: true });
  };

  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    }).format(new Date(date));
  };

  const formatTime = (date: string) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
    }).format(new Date(date));
  };

  if (loading) {
    return (
      <AnimatedPage>
        <section className="min-h-screen bg-zinc-950 px-4 py-20">
          <div className="mx-auto max-w-[1280px]">
            <p className="font-mono text-xs uppercase tracking-widest text-zinc-500">
              Loading team portal...
            </p>
          </div>
        </section>
      </AnimatedPage>
    );
  }

  return (
    <AnimatedPage>
      <section className="border-b border-zinc-800 bg-zinc-950">
        <div className="mx-auto max-w-[1280px] px-4 py-12 lg:px-8">

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">

            <div>
              <div className="mb-3 flex items-center gap-3">
                <span className="h-px w-8 bg-red-600" />

                <span className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-red-500">
                  Iron Crusaders • Team Portal
                </span>
              </div>

              <h1 className="text-4xl font-black uppercase tracking-tight text-white sm:text-5xl">
                Team Dashboard
              </h1>

              <p className="mt-3 text-sm text-zinc-500">
                Signed in as {email}
              </p>
            </div>

            <button
              onClick={signOut}
              className="border border-zinc-700 bg-zinc-900 px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.12em] text-zinc-300 transition-colors hover:border-red-600 hover:text-white"
            >
              Sign Out
            </button>

          </div>

        </div>
      </section>

      <section className="bg-zinc-900">
        <div className="mx-auto max-w-[1280px] px-4 py-12 lg:px-8">

          <div className="grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">

            {/* SCHEDULE */}

            <div>
              <div className="mb-5 flex items-end justify-between">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-red-500">
                    Upcoming
                  </p>

                  <h2 className="mt-1 text-2xl font-black uppercase text-white">
                    Schedule
                  </h2>
                </div>
              </div>

              <div className="space-y-3">
                {schedule.length === 0 ? (
                  <div className="border border-zinc-800 bg-zinc-950 p-6 text-sm text-zinc-500">
                    No upcoming events.
                  </div>
                ) : (
                  schedule.map((item) => (
                    <div
                      key={item.id}
                      className="border border-zinc-800 bg-zinc-950 p-5 transition-colors hover:border-zinc-700"
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                        <div>
                          <h3 className="font-bold text-white">
                            {item.title}
                          </h3>

                          {item.description && (
                            <p className="mt-1 text-sm text-zinc-500">
                              {item.description}
                            </p>
                          )}

                          {item.location && (
                            <p className="mt-3 font-mono text-[11px] uppercase tracking-wide text-zinc-600">
                              📍 {item.location}
                            </p>
                          )}
                        </div>

                        <div className="shrink-0 text-left sm:text-right">
                          <div className="font-mono text-xs font-bold uppercase text-red-500">
                            {formatDate(item.start_time)}
                          </div>

                          <div className="mt-1 text-sm text-zinc-300">
                            {formatTime(item.start_time)}

                            {item.end_time &&
                              ` – ${formatTime(item.end_time)}`}
                          </div>
                        </div>

                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* ANNOUNCEMENTS */}

            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-red-500">
                Team
              </p>

              <h2 className="mt-1 text-2xl font-black uppercase text-white">
                Announcements
              </h2>

              <div className="mt-5 space-y-3">
                {announcements.length === 0 ? (
                  <div className="border border-zinc-800 bg-zinc-950 p-5 text-sm text-zinc-500">
                    No announcements.
                  </div>
                ) : (
                  announcements.map((announcement) => (
                    <div
                      key={announcement.id}
                      className="border border-zinc-800 bg-zinc-950 p-5"
                    >
                      <h3 className="font-bold text-white">
                        {announcement.title}
                      </h3>

                      <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                        {announcement.body}
                      </p>

                      <p className="mt-4 font-mono text-[10px] uppercase tracking-wide text-zinc-700">
                        {formatDate(announcement.created_at)}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>

        </div>
      </section>

      <section className="border-t border-zinc-800 bg-zinc-950">
        <div className="mx-auto max-w-[1280px] px-4 py-12 lg:px-8">

          <h2 className="text-2xl font-black uppercase text-white">
            Team Resources
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

            <div className="border border-zinc-800 bg-zinc-900 p-5">
              <p className="font-mono text-[10px] uppercase tracking-widest text-red-500">
                Resource
              </p>

              <h3 className="mt-2 font-bold text-white">
                Team Documents
              </h3>

              <p className="mt-2 text-sm text-zinc-500">
                Important team documents and information.
              </p>
            </div>

            <div className="border border-zinc-800 bg-zinc-900 p-5">
              <p className="font-mono text-[10px] uppercase tracking-widest text-red-500">
                Resource
              </p>

              <h3 className="mt-2 font-bold text-white">
                Competition Info
              </h3>

              <p className="mt-2 text-sm text-zinc-500">
                Competition dates, locations, and logistics.
              </p>
            </div>

            <div className="border border-zinc-800 bg-zinc-900 p-5">
              <p className="font-mono text-[10px] uppercase tracking-widest text-red-500">
                Resource
              </p>

              <h3 className="mt-2 font-bold text-white">
                Team Resources
              </h3>

              <p className="mt-2 text-sm text-zinc-500">
                CAD, programming, engineering, and outreach resources.
              </p>
            </div>

          </div>

        </div>
      </section>
    </AnimatedPage>
  );
}
