import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from './components/Login/Login';
import InstitutionList from './components/InstitutionList/InstitutionList';
import InstitutionForm from './components/InstitutionForm/InstitutionForm';
import Signup from './components/Signup/Signup';

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsAuthenticated(true);
    navigate('/institutions'); // Redirect after login
  };

  return (
    <Routes>
      <Route path="/" element={<Login onLogin={handleLogin} />} />
      <Route path="/institutions" element={isAuthenticated ? <InstitutionList /> : <Navigate to="/" />} />
      <Route path="/edit/:id" element={isAuthenticated ? <InstitutionForm /> : <Navigate to="/" />} />
      <Route path="/create" element={isAuthenticated ? <InstitutionForm /> : <Navigate to="/" />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

// Wrap AppWrapper with Router here
const App = () => (
  <Router>
    <AppWrapper />
  </Router>
);

export default App;
