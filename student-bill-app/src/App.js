import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import BillsPage from './components/BillsPage';
import PaymentsPage from './components/PaymentsPage';
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
      <Router>
        <Routes>
          {/* Login Route */}
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />

          {/* Bills Route */}
          <Route path="/bills" element={isLoggedIn ? <BillsPage /> : <LoginPage onLogin={handleLogin} />} />

          {/* Payments Route */}
          <Route path="/payments/:billId" element={<PaymentsPage />} />
        </Routes>
      </Router>
  );
};

export default App;
