package com.aryan.studentbill.dto;

public record StudentBillDTO(
        Long studentBillId,
        Long studentId,
        String studentRollNumber,
        Long billId,
        String billDescription,
        Double billAmount,
        String billDeadline
) {}
