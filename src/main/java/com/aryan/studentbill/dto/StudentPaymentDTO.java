package com.aryan.studentbill.dto;

public record StudentPaymentDTO(
        Long paymentId,
        Long studentId,
        String studentRollNumber,
        Long billId,
        String billDescription,
        Double amountPaid,
        String paymentDate,
        String description
) {}
