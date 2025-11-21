import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

const Route: React.FC<Props> = ({ children }) => {
  const token = sessionStorage.getItem("token");
  if (!token) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

export default Route;
