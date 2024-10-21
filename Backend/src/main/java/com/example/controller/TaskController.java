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

/*
//@CrossOrigin(origins = "http://192.168.0.69:8080")
@CrossOrigin(origins = {"http://192.168.0.69:8080", "http://192.168.0.69:8080/api/tasks"})
*/
public class TaskController {
	private final TaskService taskService;  
	
	@Autowired
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

	@PostMapping
	public void createTask(@RequestBody Task task) {
		taskService.addTask(task);
	}

	@GetMapping
	public List<Task> getAllTasks() {
		return taskService.getAllTasks();
	}

	@GetMapping("/{index}")
	public List<Task> getIndexTasks(@PathVariable int index) {
		return taskService.getIndexTasks(index);
	}

	@PatchMapping("/{id}")
	public boolean updateTask(@PathVariable Long id) {
		return taskService.updateTask(id);
	}

	@DeleteMapping("/{id}")
	public void deleteTask(@PathVariable Long id) {
		taskService.deleteTask(id);
	}

	@GetMapping("/search")
    public List<Task> searchTasks(
            @RequestParam(required = false) String name,
            @RequestParam(required = false, defaultValue = "All") String priority,
            @RequestParam(required = false, defaultValue = "true") String state,
            @RequestParam(required = false) String date) {
        
			// para facilitar la logica despues, lo convertimos directamente al llmar al back
			Boolean stateBoolean = Boolean.parseBoolean(state);

        return taskService.searchTasks(name, priority, stateBoolean, date);
    }

}
