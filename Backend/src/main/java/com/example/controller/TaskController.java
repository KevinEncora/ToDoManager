package com.example.controller;

import com.example.service.TaskService;
import com.example.model.Task;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

// This file is the controller which manages incoming requests and responds with the appropriate data.
// It defines the API endpoints

@RestController
@RequestMapping("/api/tasks")
public class TaskController {
	
	@Autowired
	private TaskService taskService;  
	
	@GetMapping
	public List<Task> getAllTasks() {
		return taskService.findAll();
	}
	
	@PostMapping
	public Task createTask(@RequestBody Task task) {
		return taskService.save(task);
	}
	
	@DeleteMapping("/{id}")
	public void deleteTask(@PathVariable Long id) {
		taskService.delete(id);
	}
}
