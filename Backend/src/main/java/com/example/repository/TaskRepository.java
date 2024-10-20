package com.example.repository;


import java.util.List; // Importing the DS List
import com.example.model.Task; // Importing object task


// Archivo donde se declaran todos los metodos que se van a ocupar dentro del back

public interface TaskRepository {

    void addTask(Task task);
    List<Task> getAllTasks();
    void deleteTask(Long id);

    }
