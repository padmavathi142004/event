import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import { useAuth } from './context/AuthContext';

function App() {
  const { user } = useAuth();

  return (
    <>
      <h1 className="app-title">Smart Event Management</h1>

      <Routes>
        <Route
          path="/"
          element={
            !user ? (
              <Login />
            ) : (
              <Navigate to={user.role === 'admin' ? '/admin' : '/user'} />
            )
          }
        />

        <Route
          path="/admin"
          element={
            user?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/" />
          }
        />

        <Route
          path="/user"
          element={
            user?.role === 'user' ? <UserDashboard /> : <Navigate to="/" />
          }
        />
      </Routes>
    </>
  );
}

export default App;
