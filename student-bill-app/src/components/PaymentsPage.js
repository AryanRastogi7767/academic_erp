import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';
import { Table, Button } from 'react-bootstrap'; // Importing Bootstrap Table and Button

const PaymentsPage = () => {
    const { billId } = useParams(); // Get the billId from the URL
    const [payments, setPayments] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate(); // For navigation

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await API.get(`/student-payments/bill/${billId}`);
                console.log('Payments fetched:', response.data);
                setPayments(response.data); // Set payments data in state
            } catch (err) {
                console.error('Error fetching payments:', err);
                setError('Failed to load payments');
            }
        };

        fetchPayments();
    }, [billId]); // Dependency array ensures it runs when billId changes

    const printReceipt = (payment) => {
        // Create a printable receipt content
        const receiptContent = `
            <h1>Payment Receipt</h1>
            <p><strong>Payment ID:</strong> ${payment.paymentId}</p>
            <p><strong>Bill ID:</strong> ${payment.billId}</p>
            <p><strong>Description:</strong> ${payment.billDescription}</p>
            <p><strong>Amount Paid:</strong> ₹${payment.amountPaid}</p>
            <p><strong>Payment Date:</strong> ${payment.paymentDate}</p>
            <p><strong>Details:</strong> ${payment.description}</p>
        `;

        // Open a new window to print the receipt
        const printWindow = window.open('', '', 'height=800, width=500');
        printWindow.document.write(receiptContent);
        printWindow.document.close();
        printWindow.print();
    };

    // Function to navigate back to the Bills page
    const handleGoBack = () => {
        navigate('/bills'); // Navigate to the Bills page
    };

    return (
        <div className="container mt-4">
            <h1>Payments for Bill ID: {billId}</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {payments.length === 0 && !error && <p>No payments found for this bill</p>}

            {/* Table for displaying payments */}
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Payment ID</th>
                    <th>Amount Paid</th>
                    <th>Payment Date</th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {payments.map((payment) => (
                    <tr key={payment.paymentId}>
                        <td>{payment.paymentId}</td>
                        <td>₹{payment.amountPaid}</td>
                        <td>{payment.paymentDate}</td>
                        <td>{payment.description}</td>
                        <td>
                            <Button
                                variant="secondary"
                                onClick={() => printReceipt(payment)}
                            >
                                Print Receipt
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>

            {/* Go Back Button */}
            <Button variant="primary" onClick={handleGoBack}>
                Go Back to Bills Page
            </Button>
        </div>
    );
};

export default PaymentsPage;
