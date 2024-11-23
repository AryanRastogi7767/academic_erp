package com.aryan.studentbill.controller;

import com.aryan.studentbill.dto.StudentRequest;
import com.aryan.studentbill.entity.Students;
import com.aryan.studentbill.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/students")
public class StudentsController {

    @Autowired
    private StudentService studentService;

    // Endpoint to add a new student
    @PostMapping("/add")
    public ResponseEntity<Students> addStudent(@RequestBody StudentRequest studentRequest) {
        // Call the service to add the student
        Students newStudent = studentService.addStudent(studentRequest);

        // Return a response with the created student
        return new ResponseEntity<>(newStudent, HttpStatus.CREATED);
    }
}
