package com.example.repository;


import java.util.List; // Importing the DS List
import com.example.model.Task; // Importing object task


// Archivo donde se declaran todos los metodos que se van a ocupar dentro del back

public interface TaskRepository {

    void addTask(Task task);
    List<Task> getAllTasks();
    List<Task> getIndexTasks(int index);
    boolean updateTask(Long id);
    void deleteTask(Long id);
    List<Task> searchTasks(String name, String priority, boolean state, String date);

    }
