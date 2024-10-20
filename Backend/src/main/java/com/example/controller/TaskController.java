package com.example.controller;

import com.example.service.TaskService;
import com.example.model.Task;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


// This file is the controller which manages incoming requests and responds with the appropriate data.
// It defines the API endpoints


// Esto archivo contiene los controladores REST. Aqui se manejan las solicitudes HTTP entrantes y devuelven la respuesta 
// adecuada, se ocupan GetMapping, PostMapping para definir los endpoints 


// Aqui se hace uso del archivo de "Service" que es la que maneja toda la logica del negocio 


@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://192.168.0.69:8080")
public class TaskController {
	
	@Autowired
	private TaskService taskService;  
	
	@PostMapping
	public Task createTask(@RequestBody Task task) {
		return taskService.addTask(task);
	}

	@GetMapping
	public List<Task> getAllTasks() {
		return taskService.getAllTasks();
	}

	@DeleteMapping("/{id}")
	public void deleteTask(@PathVariable Long id) {
		taskService.deleteTask(id);
	}
}
