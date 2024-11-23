package com.aryan.studentbill.mapper;

import com.aryan.studentbill.dto.StudentBillDTO;
import com.aryan.studentbill.entity.StudentBills;

public class StudentBillMapper {
    public static StudentBillDTO toDTO(StudentBills studentBills) {
        return new StudentBillDTO(
                studentBills.getId(),
                studentBills.getStudent().getStudentId(),
                studentBills.getStudent().getRollNumber(),
                studentBills.getBill().getBillId(),
                studentBills.getBill().getDescription(),
                studentBills.getBill().getAmount(),
                studentBills.getBill().getDeadline()
        );
    }
}
