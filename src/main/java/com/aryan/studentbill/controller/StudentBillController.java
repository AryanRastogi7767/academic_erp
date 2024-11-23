package com.aryan.studentbill.controller;

import com.aryan.studentbill.dto.StudentBillDTO;
import com.aryan.studentbill.service.StudentBillService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/student-bills")
public class StudentBillController {
    private final StudentBillService studentBillService;

    public StudentBillController(StudentBillService studentBillService) {
        this.studentBillService = studentBillService;
    }

    // Get bills for a specific student
    @GetMapping("/student/{studentId}")
    @ResponseStatus(HttpStatus.OK)
    public List<StudentBillDTO> getBillsByStudentId(@PathVariable Long studentId) {
        return studentBillService.getBillsByStudentId(studentId);
    }

    // Get bills for a specific bill (can be useful for admin or specific queries)
    @GetMapping("/bill/{billId}")
    @ResponseStatus(HttpStatus.OK)
    public List<StudentBillDTO> getBillsByBillId(@PathVariable Long billId) {
        return studentBillService.getBillsByBillId(billId);
    }
}
