import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/Layout";

import Home from "./pages/Home";
import CurrentRobot from "./pages/CurrentRobot";
import PastRobots from "./pages/PastRobots";
import RobotArchive from "./pages/RobotArchive";
import About from "./pages/About";
import Students from "./pages/Students";
import Mentors from "./pages/Mentors";
import Leadership from "./pages/Leadership";
import Outreach from "./pages/Outreach";
import Events from "./pages/Events";
import Awards from "./pages/Awards";
import Media from "./pages/Media";
import Resources from "./pages/Resources";
import Contact from "./pages/Contact";
import Newsletter from "./pages/Newsletter";
import NewsletterSignup from "./pages/NewsletterSignup";
import Sponsors from "./pages/Sponsors";
import NotFound from "./pages/NotFound";

import TeamLogin from "./pages/TeamLogin";
import TeamDashboard from "./pages/TeamDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>

          {/* Home */}
          <Route index element={<Home />} />

          {/* Robots */}
          <Route path="robots">
            <Route index element={<Navigate to="current" replace />} />
            <Route path="current" element={<CurrentRobot />} />
            <Route path="past" element={<PastRobots />} />
            <Route path="archive" element={<RobotArchive />} />
          </Route>

          {/* Public Team Pages */}
          <Route path="team">
            <Route index element={<Navigate to="about" replace />} />
            <Route path="about" element={<About />} />
            <Route path="students" element={<Students />} />
            <Route path="mentors" element={<Mentors />} />
            <Route path="leadership" element={<Leadership />} />
          </Route>

          {/* Private Team Portal */}
          <Route
            path="team/portal/login"
            element={<TeamLogin />}
          />

          <Route
            path="team/portal/dashboard"
            element={
              <ProtectedRoute>
                <TeamDashboard />
              </ProtectedRoute>
            }
          />

          {/* Other Pages */}
          <Route path="outreach" element={<Outreach />} />
          <Route path="events" element={<Events />} />
          <Route path="awards" element={<Awards />} />
          <Route path="media" element={<Media />} />
          <Route path="resources" element={<Resources />} />
          <Route path="contact" element={<Contact />} />
          <Route path="newsletter" element={<Newsletter />} />
          <Route
            path="newsletter/signup"
            element={<NewsletterSignup />}
          />
          <Route path="sponsors" element={<Sponsors />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />

        </Route>
      </Routes>
    </HashRouter>
  );
}
