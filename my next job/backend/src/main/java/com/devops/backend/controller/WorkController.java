package com.devops.backend.controller;

import com.devops.backend.Service.WorkService;
import com.devops.backend.dto.WorkRequest;
import com.devops.backend.model.Work;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/works")
@AllArgsConstructor
public class WorkController{
    private final WorkService workService;

    @GetMapping
    public List<Work>getAllWorks(){
        return workService.getAllWorks();
    }
    @PostMapping
    public Work createWork(@RequestBody WorkRequest workRequest){
        return workService.saveWork(workRequest);
    }
    @PutMapping("/{id}")
    public Work updateWork(@PathVariable Long id,@RequestBody WorkRequest workRequest){
        return workService.updateWork(id,workRequest);
    }
    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id){
        workService.deleteWork(id);
    }

    @GetMapping("/findBySalaryBetween")
    public List<Work>findBySalaryBetween(Integer  startSalary,Integer endSalary){
        return workService.findBySalaryBetween(startSalary,endSalary);
    }

    @GetMapping("/search")
    public List<Work> findByGenericInput(@RequestParam String temp) {
        return workService.findByGenericInput(temp);
    }
}
