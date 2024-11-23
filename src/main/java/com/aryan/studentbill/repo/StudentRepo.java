package com.aryan.studentbill.repo;

import com.aryan.studentbill.entity.Students;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface StudentRepo extends JpaRepository<Students, Long> {
    // Find a student by roll number
    Optional<Students> findByRollNumber(String rollNumber);
    }


