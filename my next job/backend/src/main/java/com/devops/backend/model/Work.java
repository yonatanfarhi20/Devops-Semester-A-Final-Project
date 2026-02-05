package com.devops.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "works")
@Data
@NoArgsConstructor
public class Work {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private int salary;
    private String phone;
    @CreationTimestamp
    private LocalDateTime workCreationDate;

    public Work(String name,String description,int salary,String phone){
        this.name=name;
        this.description=description;
        this.salary=salary;
        this.phone=phone;
    }
}
