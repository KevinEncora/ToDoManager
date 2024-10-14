package com.example.model;

import java.time.LocalDate;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

// Blue print or structure for the main object, in this case the tasks

@Entity
@SuppressWarnings("unused")
public class Task {
    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
    private String title;
	private String description;
	private boolean completed;
	private LocalDate dueDate;

    // Getters and Setters
}
