// src/pages/AdminLogin.js
import { useState } from 'react';
import axios from 'axios';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${apiBaseUrl}/api/admin/login`, { email, password });
      localStorage.setItem('adminToken', res.data.token);
      window.location.href = '/admin/dashboard';
    } catch (err) {
      if (err.response && err.response.data.message) {
        alert(err.response.data.message);
      } else {
        alert('Login failed');
      }
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="card shadow-lg p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4">Admin Login</h2>
        
        <div className="form-group mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <button
          className="btn btn-primary w-100 mt-3"
          onClick={handleLogin}
        >
          Login
        </button>

        <div className="text-center mt-3">
          <small>Don't have an account? <a href="/admin/register">Register</a></small>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
