package com.aryan.studentbill.controller;

import com.aryan.studentbill.dto.StudentBillDTO;
import com.aryan.studentbill.entity.StudentBills;
import com.aryan.studentbill.repo.StudentBillsRepo;
import com.aryan.studentbill.service.StudentBillService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/student-bills")
public class StudentBillController {
    private final StudentBillService studentBillService;
    private final StudentBillsRepo studentBillRepository;
    public StudentBillController(StudentBillService studentBillService, StudentBillsRepo studentBillRepository) {
        this.studentBillService = studentBillService;
        this.studentBillRepository = studentBillRepository;
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

    // Get bills for a specific student by roll number
    @GetMapping("/student-roll/{rollNumber}")
    @ResponseStatus(HttpStatus.OK)
    public List<StudentBillDTO> getBillsByRollNumber(@PathVariable String rollNumber) {
        return studentBillService.getBillsByRollNumber(rollNumber);
    }



}
