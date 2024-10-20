package com.example.repository;


import com.example.model.Task; 
import org.springframework.stereotype.Repository;
import com.example.repository.TaskRepository;


import java.util.Map;
import java.util.HashMap;
import java.util.ArrayList;
import java.util.List;



@Repository
public class InMemoryTaskRepository implements TaskRepository {
    private final Map<Long, Task> TasksMap = new HashMap<>();
    private Long lastId = 0L; // Static variable to track the last assigned ID

    @Override
    public void addTask(Task task) {
        lastId++; // Increment the last ID for a new task
        task.setId(lastId); // Set the ID to the new task
        TasksMap.put(task.getId(), task);
    }   

    @Override
    public List<Task> getAllTasks() {
        //if (TasksMap.length() == 0) return ({});
        return new ArrayList<>(TasksMap.values());
    }

    @Override
    public void deleteTask(Long id) {
        TasksMap.remove(id);
    }

}

