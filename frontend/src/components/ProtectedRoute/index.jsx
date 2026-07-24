import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

/**
 * Composant utilisé pour autoriser le contenu accessible
 * uniquement aux utilisateurs authentifiés.
 * à utiliser dans le main.jsx côté router.
 *
 * @example
 * <ProtectedRoute />
 */
export default function ProtectedRoute() {
  const { userId } = useAuth();

  // Si pas d'id utilisateur, redirection vers Home pour s'authentifier
  return userId ? <Outlet /> : <Navigate to="/" replace />;
}
