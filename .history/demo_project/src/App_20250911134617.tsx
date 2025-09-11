import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/Login";
import MainLayout from "./layout/MainLayout";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<ProtectedRoutes />} />
    </Routes>
  );
}

function ProtectedRoutes() {
  // demo guard: replace with real auth logic
  const isAuth = true;
  if (!isAuth) return <Navigate to="/login" replace />;
  return (
    <Routes>
      <Route path="/*" element={<MainLayout />} />
    </Routes>
  );
}
