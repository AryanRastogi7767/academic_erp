package com.aryan.studentbill.service;

import com.aryan.studentbill.dto.StudentDTO;
import com.aryan.studentbill.dto.StudentRequest;
import com.aryan.studentbill.entity.Students;
import com.aryan.studentbill.mapper.StudentMapper;
import com.aryan.studentbill.repo.StudentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class StudentService {
    private final StudentRepo studentsRepository;

    public StudentService(StudentRepo studentsRepository) {
        this.studentsRepository = studentsRepository;
    }

    public List<StudentDTO> getAllStudents() {
        return studentsRepository.findAll().stream()
                .map(StudentMapper::toDTO)
                .collect(Collectors.toList());
    }

    public StudentDTO getStudentById(Long studentId) {
        Students student = studentsRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found with id: " + studentId));
        return StudentMapper.toDTO(student);
    }

    public StudentDTO getStudentByRollNumber(String rollNumber) {
        Students student = studentsRepository.findByRollNumber(rollNumber)
                .orElseThrow(() -> new RuntimeException("Student not found with roll number: " + rollNumber));
        return StudentMapper.toDTO(student);
    }

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Method to add a new student
    public Students addStudent(StudentRequest studentRequest) {
        // Hash the password before saving
        String hashedPassword = passwordEncoder.encode(studentRequest.password());

        // Create a new Student entity and map the fields from StudentRequest
        Students student = Students.builder()
                .rollNumber(studentRequest.rollNumber())
                .password(hashedPassword)
                .firstName(studentRequest.firstName())
                .lastName(studentRequest.lastName())
                .email(studentRequest.email())
                .photographPath(studentRequest.photographPath())
                .cgpa(studentRequest.cgpa())
                .enrollmentYear(studentRequest.enrollmentYear())
                .build();

        // Save the student entity to the database
        return studentsRepository.save(student);
    }
}
