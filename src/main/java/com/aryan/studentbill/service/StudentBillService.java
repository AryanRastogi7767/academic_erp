package com.aryan.studentbill.service;

import com.aryan.studentbill.dto.StudentBillDTO;
import com.aryan.studentbill.entity.StudentBills;
import com.aryan.studentbill.mapper.StudentBillMapper;
import com.aryan.studentbill.repo.StudentBillsRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class StudentBillService {
    private final StudentBillsRepo studentBillRepository;

    public StudentBillService(StudentBillsRepo studentBillRepository) {
        this.studentBillRepository = studentBillRepository;
    }

    public List<StudentBillDTO> getBillsByStudentId(Long studentId) {
        List<StudentBills> studentBills = studentBillRepository.findByStudent_StudentId(studentId);
        return studentBills.stream()
                .map(StudentBillMapper::toDTO)
                .collect(Collectors.toList());
    }

    public List<StudentBillDTO> getBillsByBillId(Long billId) {
        List<StudentBills> studentBills = studentBillRepository.findByBill_BillId(billId);
        return studentBills.stream()
                .map(StudentBillMapper::toDTO)
                .collect(Collectors.toList());
    }
}
