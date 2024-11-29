# Student Bill Project

This is a full-stack project for managing and viewing student bills and their payment history. The project is built using **React** for the frontend, **Spring Boot** for the backend, and **MySQL** for the database.

---

## Features

- **Student Bill Management**: View all bills assigned to a student.
- **Payment Details**: Track payments made for a specific bill.
- **Receipt Generation**: Print receipts for individual payments.
- **Navigation**: Seamless navigation between different pages using React Router.
- **API Integration**: Connects the frontend with the backend for real-time data.

---

## Technologies Used

### Frontend
- **React** (with hooks like `useEffect` and `useState`)
- **React Router** for page navigation
- **Axios** for HTTP requests
- **Bootstrap** for UI components

### Backend
- **Spring Boot** for REST API development
- **JPA/Hibernate** for database interaction
- **MySQL** as the database

---

## API Endpoints

### Bill Endpoints
- `GET /bills`: Get all bills
- `GET /bills/{billId}`: Get details of a specific bill

### Payment Endpoints
- `GET /student-payments/{studentId}/bill/{billId}`: Get payments made by a student for a specific bill

## Future Improvements
- Add role-based access control.
- Implement real-time notifications for bill payments.
- Enhance the UI with better visuals and responsiveness.
