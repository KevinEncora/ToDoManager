package main.java.com.example.repository;


import com.example.model.Task; // Importing Task
import com.example.repository.*;


import java.util.Map;
import java.util.HashMap;
import java.util.ArrayList;
import java.util.List;


public class InMemoryTaskRepository implements TaskRepository {
    private Map<Long, Task> TasksMap = new HashMap<>();

    @Override
    public Task addTask(Task task) {
        TasksMap.put(task.getId(), task); // Use task.getId() instead of TaskMap.getId()
        return task; // If your method is supposed to return the added task
    }

    @Override
    public List<Task> getAllTasks() {
        return new ArrayList<>(TasksMap.values());
    }

    @Override
    public void deleteTask(Long id) {
        TasksMap.remove(id);
    }


    /* 

    @Override
    public void updateTask(Task Task) {
        Tasks.put(Task.getId(), Task);
    }

    @Override
    public Task getTaskById(String id) {
        return Tasks.get(id);
    }

    */


}

