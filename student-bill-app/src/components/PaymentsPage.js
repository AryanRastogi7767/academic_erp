import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api'; // Your API service
import { Table, Button, Container } from 'react-bootstrap';
import './PaymentsPage.css'; // Your custom CSS file

const PaymentsPage = () => {
    const { billId, studentId } = useParams(); // Extract billId and studentId from the URL path
    const [bill, setBill] = useState(null); // State for bill details
    const [payments, setPayments] = useState([]); // State for payments
    const [error, setError] = useState(''); // State for error handling
    const navigate = useNavigate(); // For navigation

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                // Fetch bill details from the backend
                const billResponse = await API.get(`/bills/${billId}`);
                setBill(billResponse.data); // Store bill details in state

                // Fetch payments for the student and the specific bill
                const paymentsResponse = await API.get(`/student-payments/${studentId}/bill/${billId}`);
                setPayments(paymentsResponse.data); // Store payments in state
            } catch (err) {
                console.error('Error fetching payments:', err);
                setError('Failed to load bill or payments');
            }
        };

        fetchPayments();
    }, [billId, studentId]); // Dependency array ensures that the effect runs when billId or studentId changes

    const totalPayments = payments.reduce((total, payment) => total + payment.amountPaid, 0);
    const billStatus = totalPayments >= bill?.amount ? 'Paid' : 'Due';

    const handleGoBack = () => {
        navigate('/bills'); // Navigate back to the Bills page
    };

    // Function to handle the print action with two tables (Bill Details and Payment Details)
    const handlePrintReceipt = (paymentId) => {
        const payment = payments.find(p => p.paymentId === paymentId);

        if (payment) {
            const printWindow = window.open('', '', 'height=600,width=800');
            printWindow.document.write('<html lang="html"><head><title>Receipt</title></head><body>');

            // Bill details table
            printWindow.document.write('<h2>Bill Details</h2>');
            printWindow.document.write('<table border="1" style="width:100%; border-collapse: collapse;">');
            printWindow.document.write('<tr><th>Bill ID</th><th>Description</th><th>Amount</th><th>Bill Date</th><th>Due Date</th><th>Status</th></tr>');
            printWindow.document.write(`
                <tr>
                    <td>${bill.billId}</td>
                    <td>${bill.description}</td>
                    <td>₹${bill.amount}</td>
                    <td>${bill.billDate}</td>
                    <td>${bill.deadline}</td>
                    <td>${billStatus}</td>
                </tr>
            `);
            printWindow.document.write('</table>');

            // Payment details table
            printWindow.document.write('<h2>Payment Details</h2>');
            printWindow.document.write('<table border="1" style="width:100%; border-collapse: collapse;">');
            printWindow.document.write('<tr><th>Payment ID</th><th>Amount Paid</th><th>Payment Date</th><th>Description</th></tr>');
            printWindow.document.write(`
                <tr>
                    <td>${payment.paymentId}</td>
                    <td>₹${payment.amountPaid}</td>
                    <td>${payment.paymentDate}</td>
                    <td>${payment.description}</td>
                </tr>
            `);
            printWindow.document.write('</table>');

            printWindow.document.write('</body></html>');
            printWindow.document.close();
            printWindow.print();
        }
    };

    return (
        <Container className="container">
            <h1>Payments for Bill: {bill?.description}</h1>
            {error && <p className="error-message">{error}</p>}
            {!bill && !error && <p className="loading-message">Loading bill details...</p>}

            {bill && (
                <div className="mb-5">
                    <h3 className="subheading">Bill Details</h3>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th className="table-header">Bill ID</th>
                            <th className="table-header">Description</th>
                            <th className="table-header">Amount</th>
                            <th className="table-header">Bill Date</th>
                            <th className="table-header">Due Date</th>
                            <th className="table-header">Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className="table-cell">{bill.billId}</td>
                            <td className="table-cell">{bill.description}</td>
                            <td className="table-cell">₹{bill.amount}</td>
                            <td className="table-cell">{bill.billDate}</td>
                            <td className="table-cell">{bill.deadline}</td>
                            <td className="table-cell">{billStatus}</td>
                        </tr>
                        </tbody>
                    </Table>
                </div>
            )}

            {payments.length > 0 ? (
                <div className="mb-5">
                    <h3 className="subheading">Payment Details</h3>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th className="table-header">Payment ID</th>
                            <th className="table-header">Amount Paid</th>
                            <th className="table-header">Payment Date</th>
                            <th className="table-header">Description</th>
                            <th className="table-header">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {payments.map((payment) => (
                            <tr key={payment.paymentId}>
                                <td className="table-cell">{payment.paymentId}</td>
                                <td className="table-cell">₹{payment.amountPaid}</td>
                                <td className="table-cell">{payment.paymentDate}</td>
                                <td className="table-cell">{payment.description}</td>
                                <td className="table-cell">
                                    <Button
                                        variant="primary"
                                        onClick={() => handlePrintReceipt(payment.paymentId)} // Trigger print action on button click
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
                !error && <p className="loading-message">No payments found for this bill</p>
            )}

            <div className="payment-actions">
                <Button variant="secondary" onClick={handleGoBack} className="go-back-btn">
                    Go Back to Bills Page
                </Button>
            </div>
        </Container>
    );
};

export default PaymentsPage;
