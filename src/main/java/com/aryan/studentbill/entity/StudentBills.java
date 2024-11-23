package com.aryan.studentbill.entity;


import jakarta.persistence.*;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "student_bills")

public class StudentBills {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Students student;

    @ManyToOne
    @JoinColumn(name = "bill_id", nullable = false)
    private Bills bill;

    // Make sure you have these getter methods
    public Long getId() {
        return id;
    }

    public Students getStudent() {
        return student;
    }

    public Bills getBill() {
        return bill;
    }

}
