package com.example.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

import com.example.repository.TaskRepository;
import com.example.model.Task;



// Este archivo nos ayuda a implementar toda la logica del negocio, es decir como es que 
// se debe de de manejar la informacion 

@Service
public class TaskService {

private final TaskRepository taskRepository; // Use final for better practice

@Autowired
public TaskService(TaskRepository taskRepository) { // Constructor injection
	this.taskRepository = taskRepository;
}


public void addTask(Task task) {
	taskRepository.addTask(task);
}

public List<Task> getAllTasks() {
	return taskRepository.getAllTasks();
}

  
public void deleteTask(Long id) {
	taskRepository.deleteTask(id);
}

}
