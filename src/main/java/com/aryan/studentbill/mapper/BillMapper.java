package com.aryan.studentbill.mapper;

import com.aryan.studentbill.dto.BillDTO;
import com.aryan.studentbill.entity.Bills;

public class BillMapper {
    public static BillDTO toDTO(Bills bill) {
        return new BillDTO(
                bill.getBillId(),
                bill.getDescription(),
                bill.getAmount(),
                bill.getBillDate(),
                bill.getDeadline()
        );
    }
}
