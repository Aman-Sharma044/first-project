import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./mynxDashboard.tsx/Login";
import Dashboard from "./mynxDashboard.tsx/Dashboard";
import ProtectedRoute from "./mynxDashboard.tsx/Router";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
