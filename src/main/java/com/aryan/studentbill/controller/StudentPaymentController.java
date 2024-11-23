package com.aryan.studentbill.controller;

import com.aryan.studentbill.dto.StudentPaymentDTO;
import com.aryan.studentbill.service.StudentPaymentService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/student-payments")
public class StudentPaymentController {
    private final StudentPaymentService studentPaymentService;

    public StudentPaymentController(StudentPaymentService studentPaymentService) {
        this.studentPaymentService = studentPaymentService;
    }

    // Get payments for a specific student
    @GetMapping("/student/{studentId}")
    @ResponseStatus(HttpStatus.OK)
    public List<StudentPaymentDTO> getPaymentsByStudentId(@PathVariable Long studentId) {
        return studentPaymentService.getPaymentsByStudentId(studentId);
    }

    // Get payments for a specific bill
    @GetMapping("/bill/{billId}")
    @ResponseStatus(HttpStatus.OK)
    public List<StudentPaymentDTO> getPaymentsByBillId(@PathVariable Long billId) {
        return studentPaymentService.getPaymentsByBillId(billId);
    }
}
