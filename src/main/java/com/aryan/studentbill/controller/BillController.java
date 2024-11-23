package com.aryan.studentbill.controller;

import com.aryan.studentbill.dto.BillDTO;
import com.aryan.studentbill.service.BillService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bills")
public class BillController {

    private final BillService billService;

    public BillController(BillService billService) {
        this.billService = billService;
    }

    // Get all bills
    @GetMapping
    public ResponseEntity<List<BillDTO>> getAllBills() {
        List<BillDTO> bills = billService.getAllBills();
        return ResponseEntity.ok(bills);
    }

    // Get bill by ID
    @GetMapping("/{billId}")
    public ResponseEntity<BillDTO> getBillById(@PathVariable Long billId) {
        BillDTO bill = billService.getBillById(billId);
        if (bill == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(bill);
    }

    // Add more exception handling here (e.g., ResourceNotFoundException)
}
