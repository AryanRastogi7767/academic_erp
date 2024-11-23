-- Create the database
CREATE DATABASE IF NOT EXISTS academic_erp;

-- Use the database
USE academic_erp;

-- Create the `students` table
CREATE TABLE students (
                          student_id INT AUTO_INCREMENT PRIMARY KEY,
                          roll_number VARCHAR(20) UNIQUE NOT NULL,
                          password VARCHAR(255) NOT NULL,  -- Store hashed password
                          first_name VARCHAR(50) NOT NULL,
                          last_name VARCHAR(50) NOT NULL,
                          email VARCHAR(100) UNIQUE NOT NULL,
                          photograph_path VARCHAR(255),
                          cgpa FLOAT DEFAULT 0.0,
                          enrollment_year INT NOT NULL
);

-- Create the `bills` table
CREATE TABLE bills (
                       bill_id INT AUTO_INCREMENT PRIMARY KEY,
                       description VARCHAR(255) NOT NULL,
                       amount DECIMAL(10, 2) NOT NULL,
                       bill_date DATE NOT NULL,
                       deadline DATE NOT NULL
);

-- Create the `student_bills` table (Mapping between students and bills)
CREATE TABLE student_bills (
                               id INT AUTO_INCREMENT PRIMARY KEY,
                               student_id INT NOT NULL,
                               bill_id INT NOT NULL,
                               FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
                               FOREIGN KEY (bill_id) REFERENCES bills(bill_id) ON DELETE CASCADE
);

-- Create the `student_payment` table
CREATE TABLE student_payment (
                                 payment_id INT AUTO_INCREMENT PRIMARY KEY,
                                 student_id INT NOT NULL,
                                 bill_id INT NOT NULL,
                                 payment_date DATE NOT NULL,
                                 amount DECIMAL(10, 2) NOT NULL,
                                 description VARCHAR(255),
                                 FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
                                 FOREIGN KEY (bill_id) REFERENCES bills(bill_id) ON DELETE CASCADE
);

-- Insert sample data into `students` (Note: Passwords should be hashed before insertion)
INSERT INTO students (roll_number, first_name, last_name, email, photograph_path, cgpa, enrollment_year, password)
VALUES
    ('MT2024026', 'Aryan', 'Rastogi', 'aryan.rastogi@example.com', '/images/aryan.jpg', 8.5, 2020, '$2a$10$PqZYwA4FzA9eqYt/jzMJ6OTvDzPql.ZuokCIMv0VhXjKks1gPtbwC'), -- Example of hashed password for 'password123'
    ('MT2024027', 'Priya', 'Sharma', 'priya.sharma@example.com', '/images/priya.jpg', 9.0, 2020, '$2a$10$wG/.DmeYZ0Dq8xfStWq1e.jTrcOd7kJ7fjOsFjqljzW7hrFqIiLhW'); -- Example of hashed password for 'mysecurepassword'

-- Insert sample data into `bills`
INSERT INTO bills (description, amount, bill_date, deadline)
VALUES
    ('Tuition Fee', 50000.00, '2024-01-01', '2024-01-31'),
    ('Hostel Fee', 25000.00, '2024-02-01', '2024-02-28'),
    ('Library Fine', 500.00, '2024-03-01', '2024-03-15');

-- Map students to bills in `student_bills`
INSERT INTO student_bills (student_id, bill_id)
VALUES
    (1, 1), -- Aryan has Tuition Fee
    (1, 2), -- Aryan has Hostel Fee
    (2, 3); -- Priya has Library Fine

-- Insert sample data into `student_payment`
INSERT INTO student_payment (student_id, bill_id, payment_date, amount, description)
VALUES
    (1, 1, '2024-01-10', 25000.00, 'First installment for Tuition Fee'),
    (1, 1, '2024-01-20', 25000.00, 'Second installment for Tuition Fee'),
    (1, 2, '2024-02-15', 25000.00, 'Full payment for Hostel Fee'),
    (2, 3, '2024-03-05', 500.00, 'Payment for Library Fine');
