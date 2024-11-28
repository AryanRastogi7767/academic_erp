import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import BillsPage from './components/BillsPage';
import PaymentsPage from './components/PaymentsPage';
import 'bootstrap/dist/css/bootstrap.min.css';

// Utility function to check if the token is expired
const isTokenExpired = (token) => {
    if (!token) return true;
    try {
        const payload = JSON.parse(atob(token.split('.')[1])); // Decode the token payload
        const currentTime = Date.now() / 1000; // Current time in seconds
        return payload.exp < currentTime; // Check if the token is expired
    } catch (error) {
        console.error('Invalid token:', error);
        return true; // If decoding fails, consider the token expired
    }
};

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        const token = localStorage.getItem('token');
        return token && !isTokenExpired(token);
    });

    return (
        <Router>
            <AuthHandler isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            <Routes>
                <Route path="/" element={isLoggedIn ? <Navigate to="/bills" /> : <Navigate to="/login" />} />
                <Route path="/login" element={<LoginPage onLogin={() => setIsLoggedIn(true)} />} />
                <Route path="/bills" element={isLoggedIn ? <BillsPage /> : <Navigate to="/login" />} />
                <Route path="/payments/:studentId/:billId" element={isLoggedIn ? <PaymentsPage /> : <Navigate to="/login" />} />
            </Routes>
        </Router>
    );
};

const AuthHandler = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkToken = () => {
            const token = localStorage.getItem('token');
            if (!token || isTokenExpired(token)) {
                localStorage.removeItem('token');
                localStorage.removeItem('rollNumber');
                setIsLoggedIn(false);
                navigate('/login'); // Automatically redirect to login page
            }
        };

        // Check token initially and then every second
        const interval = setInterval(checkToken, 1000);

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [setIsLoggedIn, navigate]);

    return null; // This component doesn't render anything, only handles token expiration
};

export default App;
