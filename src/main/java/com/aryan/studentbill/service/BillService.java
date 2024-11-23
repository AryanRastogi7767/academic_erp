package com.aryan.studentbill.service;

import com.aryan.studentbill.dto.BillDTO;
import com.aryan.studentbill.entity.Bills;
import com.aryan.studentbill.mapper.BillMapper;
import com.aryan.studentbill.repo.BillRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BillService {
    private final BillRepo billsRepository;

    public BillService(BillRepo billsRepository) {
        this.billsRepository = billsRepository;
    }

    public List<BillDTO> getAllBills() {
        return billsRepository.findAll().stream()
                .map(BillMapper::toDTO)
                .collect(Collectors.toList());
    }

    public BillDTO getBillById(Long billId) {
        Bills bill = billsRepository.findById(billId)
                .orElseThrow(() -> new RuntimeException("Bill not found with id: " + billId));
        return BillMapper.toDTO(bill);
    }
}
