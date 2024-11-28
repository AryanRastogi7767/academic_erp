-- Use the academic_erp database
USE academic_erp;

-- Create the students table
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

-- Create the bills table
CREATE TABLE bills (
                       bill_id INT AUTO_INCREMENT PRIMARY KEY,
                       description VARCHAR(255) NOT NULL,
                       amount DECIMAL(10, 2) NOT NULL,
                       bill_date DATE NOT NULL,
                       deadline DATE NOT NULL
);

-- Create the student_bills table (Mapping between students and bills)
CREATE TABLE student_bills (
                               id INT AUTO_INCREMENT PRIMARY KEY,
                               student_id INT NOT NULL,
                               bill_id INT NOT NULL,
                               FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
                               FOREIGN KEY (bill_id) REFERENCES bills(bill_id) ON DELETE CASCADE
);

-- Create the student_payment table
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

-- Insert students into the `students` table
INSERT INTO students (roll_number, password, first_name, last_name, email, photograph_path, cgpa, enrollment_year)
VALUES
    ('MT2024001', '$2a$12$w46VzbMKUvVKV8Wkt5R3WuC4BmtU61KkBZOnpJwYgmd6jkDR6bH/6', 'Aryan', 'Rastogi', 'aryan.r@example.com', '/images/aryan.jpg', 8.5, 2024),
    ('MT2024002', '$2a$12$omLBgRbY0H0hTvTu0XtU.eY0ACh8.gWahecjZWK.D0bbky/rWx6JC', 'Priya', 'Sharma', 'priya.s@example.com', '/images/priya.jpg', 9.0, 2024),
    ('MT2024003', '$2a$12$PZACqaTebNaVZZNyNVMjUO1IdAAx7fDcR6lBJKL0kOPgB678Ec3Za', 'Karan', 'Verma', 'karan.v@example.com', '/images/karan.jpg', 7.8, 2024),
    ('MT2024004', '$2a$12$4Xp0dbpLX9b5GrG7bqjL3OtLWw.mj7CCwjJw0SJK2levZN6cbbGWC', 'Meera', 'Iyer', 'meera.i@example.com', '/images/meera.jpg', 8.2, 2024),
    ('MT2024005', '$2a$12$I0hmfDzLB07I0XhmfPxF2OmFKjhTy4GA9HLIR7m2TkT56/0gjd7nC', 'Vikram', 'Singh', 'vikram.s@example.com', '/images/vikram.jpg', 8.9, 2024);

-- Insert bills into the `bills` table
INSERT INTO bills (description, amount, bill_date, deadline)
VALUES
    ('Tuition Fee', 60000.00, '2024-01-01', '2024-01-31'),
    ('Hostel Fee', 20000.00, '2024-02-01', '2024-02-28'),
    ('Library Fine', 300.00, '2024-03-01', '2024-03-15'),
    ('Sports Fee', 5000.00, '2024-04-01', '2024-04-15'),
    ('Lab Fee', 15000.00, '2024-05-01', '2024-05-31'),
    ('Cafeteria Fee', 2000.00, '2024-06-01', '2024-06-15'),
    ('Course Material Fee', 5000.00, '2024-07-01', '2024-07-31'),
    ('Exam Fee', 3000.00, '2024-08-01', '2024-08-15'),
    ('Transport Fee', 3000.00, '2024-09-01', '2024-09-15'),
    ('Internet Fee', 1000.00, '2024-10-01', '2024-10-15');

-- Map students to their bills in the `student_bills` table
INSERT INTO student_bills (student_id, bill_id)
VALUES
    -- Aryan's Bills
    (1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6), (1, 7), (1, 8), (1, 9), (1, 10),
    -- Priya's Bills
    (2, 1), (2, 2), (2, 3), (2, 4), (2, 5), (2, 6), (2, 7), (2, 8), (2, 9), (2, 10),
    -- Karan's Bills
    (3, 1), (3, 2), (3, 3), (3, 4), (3, 5), (3, 6), (3, 7), (3, 8), (3, 9), (3, 10),
    -- Meera's Bills
    (4, 1), (4, 2), (4, 3), (4, 4), (4, 5), (4, 6), (4, 7), (4, 8), (4, 9), (4, 10),
    -- Vikram's Bills
    (5, 1), (5, 2), (5, 3), (5, 4), (5, 5), (5, 6), (5, 7), (5, 8), (5, 9), (5, 10);

-- Insert payments into the `student_payment` table
INSERT INTO student_payment (student_id, bill_id, payment_date, amount, description)
VALUES
    -- Aryan's Payments
    (1, 1, '2024-01-05', 30000.00, 'Partial payment for Tuition Fee'),
    (1, 1, '2024-01-20', 30000.00, 'Remaining payment for Tuition Fee'),
    (1, 6, '2024-06-05', 2000.00, 'Full payment for Cafeteria Fee'),
    (1, 7, '2024-07-10', 5000.00, 'Full payment for Course Material Fee'),
    (1, 8, '2024-08-01', 3000.00, 'Full payment for Exam Fee'),
    (1, 9, '2024-09-10', 1500.00, 'Partial payment for Transport Fee'),  -- Due: Remaining 1500
    (1, 10, '2024-10-05', 1000.00, 'Full payment for Internet Fee'),

    -- Priya's Payments
    (2, 1, '2024-01-10', 20000.00, 'Partial payment for Tuition Fee'),
    (2, 1, '2024-01-25', 40000.00, 'Remaining payment for Tuition Fee'),
    (2, 6, '2024-06-08', 2000.00, 'Full payment for Cafeteria Fee'),
    (2, 7, '2024-07-15', 5000.00, 'Full payment for Course Material Fee'),
    (2, 8, '2024-08-05', 3000.00, 'Full payment for Exam Fee'),
    (2, 9, '2024-09-15', 1500.00, 'Partial payment for Transport Fee'),  -- Due: Remaining 1500
    (2, 10, '2024-10-10', 1000.00, 'Full payment for Internet Fee'),

    -- Karan's Payments
    (3, 1, '2024-01-15', 30000.00, 'Partial payment for Tuition Fee'),
    (3, 1, '2024-01-25', 30000.00, 'Remaining payment for Tuition Fee'),
    (3, 6, '2024-06-12', 2000.00, 'Full payment for Cafeteria Fee'),
    (3, 7, '2024-07-20', 5000.00, 'Full payment for Course Material Fee'),
    (3, 8, '2024-08-10', 3000.00, 'Full payment for Exam Fee'),
    (3, 9, '2024-09-20', 3000.00, 'Full payment for Transport Fee'),
    (3, 10, '2024-10-15', 1000.00, 'Full payment for Internet Fee'),

    -- Meera's Payments
    (4, 1, '2024-01-18', 30000.00, 'Partial payment for Tuition Fee'),
    (4, 1, '2024-01-28', 30000.00, 'Remaining payment for Tuition Fee'),
    (4, 6, '2024-06-15', 2000.00, 'Full payment for Cafeteria Fee'),
    (4, 7, '2024-07-25', 5000.00, 'Full payment for Course Material Fee'),
    (4, 8, '2024-08-15', 3000.00, 'Full payment for Exam Fee'),
    (4, 9, '2024-09-25', 1500.00, 'Partial payment for Transport Fee'),  -- Due: Remaining 1500
    (4, 10, '2024-10-20', 1000.00, 'Full payment for Internet Fee'),

    -- Vikram's Payments
    (5, 1, '2024-01-20', 30000.00, 'Partial payment for Tuition Fee'),
    (5, 1, '2024-01-30', 30000.00, 'Remaining payment for Tuition Fee'),
    (5, 6, '2024-06-18', 2000.00, 'Full payment for Cafeteria Fee'),
    (5, 7, '2024-07-30', 5000.00, 'Full payment for Course Material Fee'),
    (5, 8, '2024-08-20', 3000.00, 'Full payment for Exam Fee'),
    (5, 9, '2024-09-30', 1500.00, 'Partial payment for Transport Fee'),  -- Due: Remaining 1500
    (5, 10, '2024-10-25', 1000.00, 'Full payment for Internet Fee');
