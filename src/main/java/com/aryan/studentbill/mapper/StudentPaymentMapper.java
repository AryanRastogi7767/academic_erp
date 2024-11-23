package com.aryan.studentbill.mapper;

import com.aryan.studentbill.dto.StudentPaymentDTO;
import com.aryan.studentbill.entity.StudentPayment;

public class StudentPaymentMapper {
    public static StudentPaymentDTO toDTO(StudentPayment payment) {
        return new StudentPaymentDTO(
                payment.getPaymentId(),
                payment.getStudent().getStudentId(),
                payment.getStudent().getRollNumber(),
                payment.getBill().getBillId(),
                payment.getBill().getDescription(),
                payment.getAmount(),
                payment.getPaymentDate(),
                payment.getDescription()
        );
    }
}
