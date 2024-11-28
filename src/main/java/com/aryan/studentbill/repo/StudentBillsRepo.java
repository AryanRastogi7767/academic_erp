package com.aryan.studentbill.repo;

import com.aryan.studentbill.entity.StudentBills;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentBillsRepo extends JpaRepository<StudentBills, Long> {
    // Custom query method to find StudentBills by studentId
    List<StudentBills> findByStudent_StudentId(Long studentId);

    // Custom query method to find StudentBills by billId
    List<StudentBills> findByBill_BillId(Long billId);

    // Find StudentBills by student's roll number
    List<StudentBills> findByStudent_RollNumber(String rollNumber);
}