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


        if(!encryptionService.validates(loginRequest.password(), student.get().getPassword())) {
            return "Wrong roll no. or password";
        }

        return JWTHelper.generateToken(loginRequest.rollNumber()); // Return null if authentication fails
    }
}
