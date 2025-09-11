import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Appointments from "./pages/Appointments";
import MainLayout from "./components/MainLayout";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // fake auth check
  useEffect(() => {
    const auth = sessionStorage.getItem("auth");
    if (auth === "true") setIsAuthenticated(true);
    setLoading(false);
  }, []);

  if (loading) return null;

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <MainLayout>
              <Dashboard />
            </MainLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/appointments"
        element={
          isAuthenticated ? (
            <MainLayout>
              <Appointments />
            </MainLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  );
}
