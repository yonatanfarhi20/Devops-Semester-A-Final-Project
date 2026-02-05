package com.devops.backend.repository;

import com.devops.backend.model.Work;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorkJpaRepository extends JpaRepository<Work,Long>{
    List<Work>findByNameContaining(String name);
    List<Work>findByPhoneContaining(String phone);
    List<Work> findBySalaryGreaterThan(Integer salary);
    List<Work> findBySalaryBetween(Integer startSalary, Integer endSalary);
}
/*זה אשכרה מטורף הפקודות sql כביכול הוא יוצר אותם על פי כותרות אנושיות ככה שאני לא צריך לעשות עבודה שחורה*/

