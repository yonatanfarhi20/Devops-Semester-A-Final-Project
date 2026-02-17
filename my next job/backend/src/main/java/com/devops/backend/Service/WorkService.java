package com.devops.backend.Service;

import com.devops.backend.dto.WorkRequest;
import com.devops.backend.model.Work;
import com.devops.backend.repository.WorkMapper;
import com.devops.backend.repository.WorkJpaRepository;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;


@Service
@Data
@AllArgsConstructor
public class WorkService{
    private final WorkJpaRepository workRepository;//יצרתי קבוע כי אנחנו לא משנים ולא רוצים לשנות את הערך שלו במימוש
    private final WorkMapper workMapper;//כנ"ל

    public List<Work>getAllWorks(){
        return workRepository.findAll();
    }
    public Work saveWork(WorkRequest workRequest){
        Work work=workMapper.toEntity(workRequest);
        return workRepository.save(work);
    }
    public Work updateWork(Long id, WorkRequest workRequest){
        Work existingWork = workRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("לא נמצא id:"+ id));
        workMapper.updateEntityFromDto(workRequest,existingWork);
        return workRepository.save(existingWork);
    }
    public void deleteWork(Long id){
        workRepository.deleteById(id);
    }

    public List<Work>findBySalaryBetween(Integer  startSalary,Integer endSalary){
        return workRepository.findBySalaryBetween(startSalary,endSalary);
    }
    public List<Work> findByGenericInput(String temp) {
        if (temp == null||temp.isBlank())
            return Collections.emptyList();
        if (temp.matches("^05\\d{8}$"))
            return workRepository.findByPhoneContaining(temp);
        if (temp.matches("^\\d+$"))
            return workRepository.findBySalaryGreaterThan(Integer.parseInt(temp));
        return workRepository.findByNameContaining(temp);
    }
    public Work findById(Long id){
        return workRepository.findById(id).orElseThrow(() -> new RuntimeException("לא נמצא id:"+ id));
    }

}
