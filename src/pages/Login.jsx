import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../App.css';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !password) return;

    // ADMIN login hardcoded
    if (role === 'admin') {
      if (name === 'admin' && password === 'admin') {
        login(name, role);  // set user in context
        navigate('/admin'); // redirect to admin dashboard
        setError('');
      } else {
        setError('Invalid admin credentials!');
      }
      return;
    }

    // USER login
    login(name, role); 
    navigate('/user');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>

        {/* Role Slider */}
        <div className={`role-toggle ${role}`}>
          <div
            className={`role-option ${role === 'user' ? 'active' : ''}`}
            onClick={() => setRole('user')}
          >
            User
          </div>
          <div
            className={`role-option ${role === 'admin' ? 'active' : ''}`}
            onClick={() => setRole('admin')}
          >
            Admin
          </div>
          <div className={`slider ${role}`} />
        </div>

        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="login-btn">
            Log In
          </button>

          {/* Error message below the button */}
          {error && <p className="login-error">{error}</p>}
        </form>
      </div>
    </div>
  );
}
