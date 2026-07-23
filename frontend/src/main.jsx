import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Error from "./pages/Error";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import "./index.css";
import { DataProvider } from "./contexts/DataContext";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      {/* On passe la location et la clé unique pour forcer Framer Motion à détecter le changement de page */}
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>
        <Route path="/error" element={<Error />} />
        <Route
          path="*"
          element={<Navigate to="/error" state={{ errorCode: 404 }} replace />}
        />
      </Routes>
    </AnimatePresence>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <DataProvider>
          <AnimatedRoutes />
        </DataProvider>
      </AuthProvider>
    </Router>
  </StrictMode>,
);
