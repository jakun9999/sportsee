import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function ProtectedRoute() {
  const { userId } = useAuth();

  // Si pas d'utilisateur, redirection vers Home (ou /login)
  return userId ? <Outlet /> : <Navigate to="/" replace />;
}
