package com.aryan.studentbill.dto;

public record StudentDTO(
        Long studentId,
        String rollNumber,
        String firstName,
        String lastName,
        String email,
        Float cgpa,
        Integer enrollmentYear
) {}
