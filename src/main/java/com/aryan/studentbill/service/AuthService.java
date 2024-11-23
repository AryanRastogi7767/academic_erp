package com.aryan.studentbill.service;

import com.aryan.studentbill.dto.LoginRequest;
import com.aryan.studentbill.entity.Students;
import com.aryan.studentbill.helper.EncryptionService;
import com.aryan.studentbill.helper.JWTHelper;
import com.aryan.studentbill.repo.StudentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private StudentRepo studentRepository;
    private final JWTHelper jwt;

    @Autowired
    private PasswordEncoder passwordEncoder; // Injecting PasswordEncoder
    @Autowired
    private EncryptionService encryptionService;

    public AuthService(JWTHelper jwt) {
        this.jwt = jwt;
    }

    // Method to authenticate the user and generate JWT token
    public String authenticateAndGenerateToken(LoginRequest loginRequest) {
        // Retrieve the student from the database using the roll number
        Optional<Students> student = studentRepository.findByRollNumber(loginRequest.rollNumber());

//        // Check if the student exists and the password matches
//        if (studentOpt.isPresent()) {
//            Students student = studentOpt.get();
//            if (passwordEncoder.matches(loginRequest.password(), student.getPassword())) {
//                // Generate JWT token using student ID or other details (ensure to get the correct data)
//                String token = JWTHelper.generateToken(String.valueOf(student.getStudentId())); // Correctly extract student ID
//                System.out.println(token);
//                return new LoginResponse(token); // Return the JWT token
//            }
//        }
        if(!encryptionService.validates(loginRequest.password(), student.get().getPassword())) {
            return "Wrong roll no. or password";
        }

        return JWTHelper.generateToken(loginRequest.rollNumber()); // Return null if authentication fails
    }
}
