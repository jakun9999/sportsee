import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Error from "./pages/Error";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AnimatePresence mode="wait">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </AnimatePresence>
  </StrictMode>,
);
