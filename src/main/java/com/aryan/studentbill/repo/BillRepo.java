package com.aryan.studentbill.repo;
import com.aryan.studentbill.entity.Bills;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BillRepo extends JpaRepository<Bills, Long> {
    // Add custom queries if needed
}
