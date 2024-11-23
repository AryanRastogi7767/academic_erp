package com.aryan.studentbill.dto;

public record StudentRequest(
        String rollNumber,
        String password,
        String firstName,
        String lastName,
        String email,
        String photographPath,
        Float cgpa,
        Integer enrollmentYear
) {}
