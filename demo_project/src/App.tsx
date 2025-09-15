import { Routes, Route, Navigate } from "react-router-dom";
import type { ReactElement } from "react";
import Login from "./mynxDashboard.tsx/Login";
import Dashboard from "./mynxDashboard.tsx/Dashboard";

function PrivateRoute({ children }: { children: ReactElement }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
