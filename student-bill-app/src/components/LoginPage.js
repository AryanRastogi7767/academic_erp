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
        try {
            const response = await API.post('/auth/login', { rollNumber, password });
            localStorage.setItem('token', response.data);
            localStorage.setItem('rollNumber', rollNumber);
            onLogin();
            navigate('/bills');
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div className="w-50">
                <h1 className="text-center mb-4">Login</h1>
                <Form onSubmit={handleLogin}>
                    <Form.Group className="mb-3">
                        <Form.Label>Roll Number</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Roll Number"
                            value={rollNumber}
                            onChange={(e) => setRollNo(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
