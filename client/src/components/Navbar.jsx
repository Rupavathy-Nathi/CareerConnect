import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav>
      <span>{user.name}</span>

      {user.role === "student" && <span>Student Dashboard</span>}
      {user.role === "recruiter" && <span>Recruiter Dashboard</span>}

      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}
