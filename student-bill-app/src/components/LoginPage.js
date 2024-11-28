import React, { useState } from 'react';
import { Button, Form, Container, Alert } from 'react-bootstrap';
import API from '../api';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ onLogin }) => {
    const [rollNumber, setRollNo] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); // Clear any previous error

        try {
            // Make the login API request
            const response = await API.post('/auth/login', { rollNumber, password });

            // Check if a token is returned in the response
            if (response.data !== "Wrong roll no. or password") {
                // Store the token and roll number in localStorage
                localStorage.setItem('token', response.data);
                localStorage.setItem('rollNumber', rollNumber);


                // Call the onLogin function (for authentication state management)
                onLogin();

                // Navigate to the bills page
                navigate('/bills');
            } else {
                // If no token is returned, show an error message
                setError('Invalid credentials. Please try again.');
            }
        } catch (err) {
            // Handle any other errors (e.g., network issues)
            setError('Invalid credentials. Please try again.');
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div className="w-50">
                <h1 className="text-center mb-4">Academic ERP Login</h1>
                <Form onSubmit={handleLogin}>
                    <Form.Group className="mb-3">
                        <Form.Label>Roll Number</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Roll Number"
                            value={rollNumber}
                            onChange={(e) => setRollNo(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100">Login</Button>
                </Form>
                {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
            </div>
        </Container>
    );
};

export default LoginPage;
