import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

import Registration from './aute/Regstration'; // keep original file name, just corrected spelling in import
import PrivateRoute from './aute/PrivateRoute'; 
import Home from './components/Home'; 
import Login from './aute/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Regstration" element={<Registration />} />

        {/* Protected Route */}
        <Route path="/Home/:email" element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
