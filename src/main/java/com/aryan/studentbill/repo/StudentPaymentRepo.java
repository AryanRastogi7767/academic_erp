package com.aryan.studentbill.repo;

import com.aryan.studentbill.entity.StudentPayment;
import com.aryan.studentbill.entity.Students;
import com.aryan.studentbill.entity.Bills;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentPaymentRepo extends JpaRepository<StudentPayment, Long> {
    // Custom query method to find payments by studentId
    List<StudentPayment> findByStudent_StudentId(Long studentId);

    // Custom query method to find payments by billId
    List<StudentPayment> findByBill_BillId(Long billId);
}