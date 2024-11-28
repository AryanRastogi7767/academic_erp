import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import { Table, Button } from 'react-bootstrap';

const BillsPage = () => {
    const [bills, setBills] = useState([]);
    const [payments, setPayments] = useState({});
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const rollNumber = localStorage.getItem('rollNumber');

    useEffect(() => {
        const fetchBillsAndPayments = async () => {
            const rollNumber = localStorage.getItem('rollNumber');
            const token = localStorage.getItem('token');
            if (!rollNumber) {
                setError('No roll number found in localStorage');
                return;
            }
            if (!token) {
                setError('No token found. Please log in again');
                return;
            }

            try {
                const billResponse = await API.get(`/student-bills/student-roll/${rollNumber}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setBills(billResponse.data);

                const paymentsMap = {};
                for (const bill of billResponse.data) {
                    const paymentResponse = await API.get(`/student-payments/bill/${bill.billId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    paymentsMap[bill.billId] = paymentResponse.data;
                }
                setPayments(paymentsMap);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to load bills and payments');
            }
        };

        fetchBillsAndPayments();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('rollNumber');
        localStorage.removeItem('token');
        navigate('/login');
    };

    const getTotalPaymentsForBill = (billId) => {
        const billPayments = payments[billId] || [];
        return billPayments.reduce((sum, payment) => sum + payment.amountPaid, 0);
    };

    const handleViewPayments = (billId) => {
        navigate(`/payments/${billId}`);
    };

    return (
        <div style={styles.pageContainer}>
            <div style={styles.headerContainer}>
                <h1>Student Bills for {rollNumber}</h1>
                <Button variant="danger" onClick={handleLogout}>
                    Logout
                </Button>
            </div>

            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

            <Table striped bordered hover style={styles.table}>
                <thead>
                <tr>
                    <th>Bill ID</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Due Date</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {bills.map((bill) => {
                    const totalPayments = getTotalPaymentsForBill(bill.billId);
                    const isPaid = totalPayments >= bill.billAmount;
                    const amountDue = bill.billAmount - totalPayments;

                    return (
                        <tr key={bill.billId}>
                            <td>{bill.billId}</td>
                            <td>{bill.billDescription}</td>
                            <td>₹{bill.billAmount}</td>
                            <td>{bill.billDeadline}</td>
                            <td>{isPaid ? 'Paid' : `Due ₹${amountDue.toFixed(2)}`}</td>
                            <td>
                                <Button
                                    variant="primary"
                                    onClick={() => handleViewPayments(bill.billId)}
                                >
                                    View Payments
                                </Button>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </Table>
        </div>
    );
};

const styles = {
    pageContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        // minHeight: '100vh', // Vertically center
        padding: '20px',
        backgroundColor: '#f8f9fa',
    },
    headerContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        maxWidth: '1300px', // Limit width of the content
        marginBottom: '20px',
    },
    table: {
        width: '100%',
        maxWidth: '1300px',
        backgroundColor: 'white',
    },
};

export default BillsPage;
