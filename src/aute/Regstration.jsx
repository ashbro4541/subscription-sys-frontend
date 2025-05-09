import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Registration = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    startdate: '',
    subscriptionDuration: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMsg('');

    try {
      const response = await axios.post('http://localhost:3000/register', formData);
      if (response.data.success) {
        setMsg('Registration successful!');
        navigate('/login'); // Redirect to login page
      } else {
        setMsg(response.data.message || 'Registration failed.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setMsg(error.response?.data?.message || 'Server error.');
    }

    setIsSubmitting(false);
  };

  return (
    <div className="bg-light">
      <section className="vh-100" style={{ background: 'linear-gradient(to right, #74ebd5, #ACB6E5)' }}>
        <div className="d-flex flex-column justify-content-center align-items-center text-center" style={{ height: '100vh' }}>
          <h3 className="mb-4 fw-bold">Signup Page</h3>
          <div className="card shadow-lg p-4" style={{ width: '100%', maxWidth: '500px', borderRadius: '1rem' }}>
            <h3 className="mb-4 fw-bold">Create an Account</h3>
            {msg && <div className="alert alert-info text-center py-2">{msg}</div>}

            <form onSubmit={handleSubmit}>
              <div className="form-outline mb-4">
                <label className="form-label">Email address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control form-control-lg shadow-sm"
                  required
                />
              </div>

              <div className="form-outline mb-4">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-control form-control-lg shadow-sm"
                  required
                />
              </div>

              <div className="form-outline mb-4">
                <label className="form-label">Subscription Start Date</label>
                <input
                  type="date"
                  name="startdate"
                  value={formData.startdate}
                  onChange={handleChange}
                  className="form-control form-control-lg shadow-sm"
                  required
                />
              </div>

              <div className="form-outline mb-4">
                <label className="form-label">Subscription Duration</label>
                <select
                  name="subscriptionDuration"
                  className="form-select"
                  value={formData.subscriptionDuration}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Select Duration --</option>
                  <option value="1_month">1 Month</option>
                  <option value="1_year">1 Year</option>
                </select>
              </div>

              <div className="d-grid mb-3">
                <button type="submit" className="btn btn-primary btn-lg" disabled={isSubmitting}>
                  {isSubmitting ? 'Signing Up...' : 'Sign Up'}
                </button>
              </div>

              <p className="text-center text-muted mb-0">
                Already have an account? <a href="/login" className="fw-bold text-body"><u>Login here</u></a>
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Registration;
