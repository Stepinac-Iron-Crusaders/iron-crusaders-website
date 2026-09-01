import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ScrollToTop } from "./ScrollToTop";
import { CustomCursor } from "./CustomCursor";
import { ScrollProgress } from "./ScrollProgress";
import { RouteTransition } from "./RouteTransition";

export function Layout() {
  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <div className="min-h-screen bg-zinc-950 text-zinc-300 antialiased">
        <ScrollToTop />
        <Header />
        <main className="overflow-x-clip">
          <RouteTransition>
            <Outlet />
          </RouteTransition>
        </main>
        <Footer />
      </div>
    </>
  );
}
