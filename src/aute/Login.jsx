import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('');

    try {
      const response = await axios.post('http://localhost:3000/loginform/', formData);

      if (response.data.success) {
        localStorage.setItem('isLoggedIn', 'true'); // Set login status
        setMsg('Login successful!');
        navigate(`/home/${formData.email}`); // Redirect to home after login
      } else {
        setMsg(response.data.message || 'Login failed. Invalid credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setMsg('An error occurred while logging in.');
    }
  };

  return (
    <div className="d-flex justify-content-center  vh-100" style={{ background: 'linear-gradient(to right, #74ebd5, #ACB6E5)' }} >
    <div className="container d-flex justify-content-center align-items-center " >
      <div className="card p-4">
        <h3 className="mb-4 text-center">Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              name="email"
              className="form-control"
              placeholder="Enter email "
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter password"
              onChange={handleChange}
              required
            />
          </div>
          {msg && <p className="text-danger">{msg}</p>}
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
        </form>
        <p className="text-center mt-3">
          Don't have an account? <a href="/Regstration" className="link-danger">Register</a>
        </p>
      </div>
    </div></div>
  );
};

export default Login;
