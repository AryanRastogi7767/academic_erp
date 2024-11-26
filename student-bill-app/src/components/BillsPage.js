import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importing useNavigate for navigation
import API from '../api';
import { Table, Button } from 'react-bootstrap'; // Importing Bootstrap Table and Button

const BillsPage = () => {
    const [bills, setBills] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate(); // For navigation to payment page

    useEffect(() => {
        const fetchBills = async () => {
            const rollNumber = localStorage.getItem('rollNumber'); // Ensure rollNumber is stored in localStorage
            if (!rollNumber) {
                setError('No roll number found in localStorage');
                return;
            }

            try {
                // Make sure the API URL is correct and matches the backend path
                const response = await API.get(`/student-bills/student-roll/${rollNumber}`);
                console.log('Bills fetched:', response.data);
                setBills(response.data); // Update state with the fetched bills
            } catch (err) {
                console.error('Error fetching bills:', err);
                setError('Failed to load bills');
            }
        };

        fetchBills();
    }, []); // Only runs once when the component is mounted

    // Handle navigation to the payment page for a specific bill
    const handleViewPayments = (billId) => {
        navigate(`/payments/${billId}`);
    };

    return (
        <div className="container mt-4">
            <h1>Student Bills</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {bills.length === 0 && !error && <p>No bills found</p>}

            {/* Table for displaying bills */}
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Bill ID</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Due Date</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {bills.map((bill) => (
                    <tr key={bill.studentBillId}>
                        <td>{bill.billId}</td>
                        <td>{bill.billDescription}</td>
                        <td>₹{bill.billAmount}</td>
                        <td>{bill.billDeadline}</td>
                        <td>
                            <Button
                                variant="primary"
                                onClick={() => handleViewPayments(bill.billId)}
                            >
                                View Payments
                            </Button>
                            {/* You can add the Print Receipt button here if needed */}
                            {/* <Button variant="secondary" onClick={() => handlePrintReceipt(bill)}>Print Receipt</Button> */}
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
};

export default BillsPage;
