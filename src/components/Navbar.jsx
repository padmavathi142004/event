import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="nav">
      <h3>Smart Event Dashboard</h3>
      {user && <button onClick={logout}>Logout</button>}
    </nav>
  );
}
