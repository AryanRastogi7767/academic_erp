import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importing useNavigate for navigation
import API from '../api';
import { Table, Button } from 'react-bootstrap';

const BillsPage = () => {
    const [bills, setBills] = useState([]);
    const [payments, setPayments] = useState({});
    const [error, setError] = useState('');
    const navigate = useNavigate(); // For navigation to payment page

    useEffect(() => {
        const fetchBillsAndPayments = async () => {
            const rollNumber = localStorage.getItem('rollNumber'); // Ensure rollNumber is stored in localStorage
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
                // Fetch bills
                const billResponse = await API.get(`/student-bills/student-roll/${rollNumber}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setBills(billResponse.data);

                // Fetch payments for each bill
                const paymentsMap = {};
                for (const bill of billResponse.data) {
                    const paymentResponse = await API.get(`/student-payments/bill/${bill.billId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    paymentsMap[bill.billId] = paymentResponse.data; // Store payments by billId
                }
                setPayments(paymentsMap); // Set the payments for each bill
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to load bills and payments');
            }
        };

        fetchBillsAndPayments();
    }, []); // Only runs once when the component is mounted

    // Logout functionality
    const handleLogout = () => {
        localStorage.removeItem('rollNumber');
        localStorage.removeItem('token');
        navigate('/login'); // Redirect to login page
    };
    // Calculate total payments made for a specific bill
    const getTotalPaymentsForBill = (billId) => {
        const billPayments = payments[billId] || []; // Get payments for this billId
        const totalPayments = billPayments.reduce((sum, payment) => sum + payment.amountPaid, 0);
        return totalPayments;
    };

    // Handle navigation to the payment page for a specific bill
    const handleViewPayments = (billId) => {
        navigate(`/payments/${billId}`);
    };

    return (
        <div>
            {/*<h1>Student Bills</h1>*/}
            {/*{error && <p style={{ color: 'red' }}>{error}</p>}*/}
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
                <h1>Student Bills</h1>
                <Button variant="danger" onClick={handleLogout}>
                    Logout
                </Button>
            </div>

            <Table striped bordered hover>
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

export default BillsPage;
