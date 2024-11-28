package com.aryan.studentbill.service;

import com.aryan.studentbill.dto.StudentPaymentDTO;
import com.aryan.studentbill.entity.StudentPayment;
import com.aryan.studentbill.mapper.StudentPaymentMapper;
import com.aryan.studentbill.repo.StudentPaymentRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class StudentPaymentService {
    private final StudentPaymentRepo studentPaymentRepository;

    public StudentPaymentService(StudentPaymentRepo studentPaymentRepository) {
        this.studentPaymentRepository = studentPaymentRepository;
    }

    public List<StudentPaymentDTO> getPaymentsByStudentId(Long studentId) {
        List<StudentPayment> payments = studentPaymentRepository.findByStudent_StudentId(studentId);
        return payments.stream()
                .map(StudentPaymentMapper::toDTO)
                .collect(Collectors.toList());
    }

    public List<StudentPaymentDTO> getPaymentsByBillId(Long billId) {
        List<StudentPayment> payments = studentPaymentRepository.findByBill_BillId(billId);
        return payments.stream()
                .map(StudentPaymentMapper::toDTO)
                .collect(Collectors.toList());
    }

    public List<StudentPaymentDTO> getPaymentsByStudentIdAndBillId(Long studentId, Long billId) {
        List<StudentPayment> payments = studentPaymentRepository.findByStudent_StudentIdAndBill_BillId(studentId, billId);
        return payments.stream()
                .map(StudentPaymentMapper::toDTO)
                .collect(Collectors.toList());
    }
}
