package com.aryan.studentbill.controller;

import com.aryan.studentbill.dto.LoginRequest;
import com.aryan.studentbill.dto.LoginResponse;
import com.aryan.studentbill.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

    @Autowired
    private AuthService authService;

    // Login endpoint to authenticate the user and generate JWT token
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
        // Validate credentials and generate JWT token
        return ResponseEntity.ok(authService.authenticateAndGenerateToken(loginRequest));


    }
}
