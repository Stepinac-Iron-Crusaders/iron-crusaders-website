import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

type Props = {
  children: React.ReactNode;
  allowedRoles?: string[];
};

export default function ProtectedRoute({ children, allowedRoles }: Props) {
  const { user, profile, role, isActive, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-zinc-950">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin border-2 border-zinc-700 border-t-red-600" />
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.15em] text-zinc-500">
            Verifying Access
          </p>
        </div>
      </div>
    );
  }

  if (!user || !profile || !isActive) {
    return (
      <Navigate
        to="/team/portal/login"
        replace
        state={{ from: location }}
      />
    );
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    // Redirect to the correct dashboard for the user's role
    const redirect =
      role === "admin"
        ? "/team/portal/admin"
        : role === "team_lead"
          ? "/team/portal/lead"
          : "/team/portal/member";
    return <Navigate to={redirect} replace />;
  }

  return <>{children}</>;
}
