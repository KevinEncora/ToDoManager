package com.example.service;

import com.example.repository.TaskRepository;
import com.example.model.Task;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TaskService {

@Autowired
private TaskRepository taskRepository;

public List<Task> findAll() {
	return taskRepository.findAll();
}

  
public Task save(Task task) {
	return taskRepository.save(task);
}

  
public void delete(Long id) {
	taskRepository.deleteById(id);
}

// Additional methods for finding by ID, etc.

}
