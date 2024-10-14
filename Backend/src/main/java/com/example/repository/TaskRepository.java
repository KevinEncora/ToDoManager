package com.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.model.Task;


// This file is to handle the data access
// By extends of "JpaRepository" we get buil-in methods for common operations like saving and retrieving data
// all of this without having the need of writng SQL queries 

public interface TaskRepository extends JpaRepository<Task, Long> {

}

