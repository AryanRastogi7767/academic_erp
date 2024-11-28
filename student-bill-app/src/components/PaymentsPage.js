import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';
import { Table, Button, Container } from 'react-bootstrap'; // Importing Bootstrap components

const PaymentsPage = () => {
    const { billId } = useParams(); // Get the billId from the URL
    const [bill, setBill] = useState(null); // State for bill details
    const [payments, setPayments] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate(); // For navigation

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                // Fetch bill details
                const billResponse = await API.get(`/bills/${billId}`);
                console.log('Bill details fetched:', billResponse.data); // Log bill details
                setBill(billResponse.data); // Set bill details in state

                // Fetch payments for the bill
                const response = await API.get(`/student-payments/bill/${billId}`);
                console.log('Payments fetched:', response.data); // Log payments data
                setPayments(response.data); // Set payments data in state
            } catch (err) {
                console.error('Error fetching payments:', err);
                setError('Failed to load bill or payments');
            }
        };

        fetchPayments();
    }, [billId]); // Dependency array ensures it runs when billId changes

    const totalPayments = payments.reduce((total, payment) => total + payment.amountPaid, 0);
    const billStatus = totalPayments >= bill?.amount ? 'Paid' : 'Due';

    const printReceipt = (payment) => {
        // Create a printable receipt content with tables
        const receiptContent = `
            <h1 style="text-align: center;">Payment Receipt</h1>
            <h3 style="text-align: center;">Bill Details</h3>
            <table style="width: 100%; border: 1px solid #ccc; border-collapse: collapse; margin-bottom: 20px;">
                <tr>
                    <th style="padding: 8px; text-align: left; border: 1px solid #ccc;">Bill ID</th>
                    <th style="padding: 8px; text-align: left; border: 1px solid #ccc;">Description</th>
                    <th style="padding: 8px; text-align: left; border: 1px solid #ccc;">Amount</th>
                    <th style="padding: 8px; text-align: left; border: 1px solid #ccc;">Bill Date</th>
                    <th style="padding: 8px; text-align: left; border: 1px solid #ccc;">Due Date</th>
                </tr>
                <tr>
                    <td style="padding: 8px; border: 1px solid #ccc;">${bill.billId}</td>
                    <td style="padding: 8px; border: 1px solid #ccc;">${bill.description}</td>
                    <td style="padding: 8px; border: 1px solid #ccc;">₹${bill.amount}</td>
                    <td style="padding: 8px; border: 1px solid #ccc;">${bill.billDate}</td>
                    <td style="padding: 8px; border: 1px solid #ccc;">${bill.deadline}</td>
                </tr>
            </table>

            <h3 style="text-align: center;">Payment Details</h3>
            <table style="width: 100%; border: 1px solid #ccc; border-collapse: collapse;">
                <tr>
                    <th style="padding: 8px; text-align: left; border: 1px solid #ccc;">Payment ID</th>
                    <th style="padding: 8px; text-align: left; border: 1px solid #ccc;">Amount Paid</th>
                    <th style="padding: 8px; text-align: left; border: 1px solid #ccc;">Payment Date</th>
                    <th style="padding: 8px; text-align: left; border: 1px solid #ccc;">Description</th>
                </tr>
                <tr>
                    <td style="padding: 8px; border: 1px solid #ccc;">${payment.paymentId}</td>
                    <td style="padding: 8px; border: 1px solid #ccc;">₹${payment.amountPaid}</td>
                    <td style="padding: 8px; border: 1px solid #ccc;">${payment.paymentDate}</td>
                    <td style="padding: 8px; border: 1px solid #ccc;">${payment.description}</td>
                </tr>
            </table>
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
        <Container className="mt-4">
            <h1 >Payments for {bill?.description}</h1>
            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
            {!bill && !error && <p style={{ textAlign: 'center' }}>Loading bill details...</p>}

            {/* Bill Details Section */}
            {bill && (
                <div className="mb-5">
                    <h3 className="text-center mb-3" style={{ fontSize: '1.5rem' }}>Bill Details</h3>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Bill ID</th>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Bill Date</th>
                            <th>Due Date</th>
                            <th>Status</th> {/* Added Status Column */}
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{bill.billId}</td>
                            <td>{bill.description}</td>
                            <td>₹{bill.amount}</td>
                            <td>{bill.billDate}</td>
                            <td>{bill.deadline}</td>
                            <td>{billStatus}</td> {/* Display Status */}
                        </tr>
                        </tbody>
                    </Table>
                </div>
            )}

            {/* Payment Details Section */}
            {payments.length > 0 ? (
                <div className="mb-5">
                    <h3 className="text-center mb-3" style={{ fontSize: '1.5rem' }}>Payment Details</h3>
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
                                        variant="primary"
                                        onClick={() => printReceipt(payment)}
                                    >
                                        Print Receipt
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </div>
            ) : (
                !error && <p style={{ textAlign: 'center' }}>No payments found for this bill</p>
            )}

            {/* Go Back Button */}
            <div className="text-center">
                <Button variant="secondary" onClick={handleGoBack}>
                    Go Back to Bills Page
                </Button>
            </div>
        </Container>
    );
};

export default PaymentsPage;
