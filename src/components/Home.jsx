import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Service = ({ subscriptionStatus }) => {
  if (subscriptionStatus === 'Active') {
    return (
      <div className="alert alert-success mt-4" role="alert">
        <h4 className="alert-heading">Subscription Status: Active ✅</h4>
        <p>You have full access to our services.</p>
        <hr />
        <ul>
          <li>📦 Access to premium content</li>
          <li>🔒 Secure storage</li>
          <li>📈 Performance analytics</li>
        </ul>
      </div>
    );
  } else if (subscriptionStatus === 'Expired') {
    return (
      <div className="alert alert-danger mt-4" role="alert">
        <h4 className="alert-heading">Subscription Status: Expired ❌</h4>
        <p>Your subscription has expired. Please renew to regain access.</p>
      </div>
    );
  } else {
    return (
      <div className="alert alert-warning mt-4" role="alert">
        <h4 className="alert-heading">Subscription Status: Unknown ❓</h4>
        <p>We couldn't verify your subscription status.</p>
      </div>
    );
  }
};

const Home = () => {
  const { email } = useParams();
  const [status, setStatus] = useState(null);
  const [subscriptionEnd, setsubscriptionEnd] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/status/${email}`);
        setStatus(res.data.status); // "Active" or "Expired"
        setsubscriptionEnd(res.data.subscriptionEnd); // new field added from backend
      } catch (err) {
        console.error("Error fetching status:", err);
        setStatus('Unknown');
      }
      setLoading(false);
    };

    fetchStatus();
  }, [email]);

  if (loading) return <p className="text-center mt-4">Loading...</p>;

  return (
    <div className="container mt-4">
      <h1 className="text-center">Welcome, {email}</h1>
      {subscriptionEnd && (
        <p className="text-center text-muted">📅 Subscription ends on: <strong>{new Date(subscriptionEnd).toLocaleDateString()}</strong></p>
      )}
      <Service subscriptionStatus={status} />
    </div>
  );
};

export default Home;
