package com.aryan.studentbill.mapper;

import com.aryan.studentbill.dto.StudentDTO;
import com.aryan.studentbill.entity.Students;

public class StudentMapper {
    public static StudentDTO toDTO(Students student) {
        return new StudentDTO(
                student.getStudentId(),
                student.getRollNumber(),
                student.getFirstName(),
                student.getLastName(),
                student.getEmail(),
                student.getCgpa(),
                student.getEnrollmentYear()
        );
    }
}
