package com.aryan.studentbill.dto;

public record BillDTO(
        Long billId,
        String description,
        Double amount,
        String billDate,
        String deadline
) {}
