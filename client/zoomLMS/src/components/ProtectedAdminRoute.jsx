import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext"; 
const ProtectedAdminRoute = ({ children }) => {
  const { user } = useUser();

  return user && user.role === "admin" ? children : <Navigate to="/login" />;
};

export default ProtectedAdminRoute;
