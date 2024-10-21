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
    public List<Task> getIndexTasks(int index) {
        int start = 20 * index;
        int end = 20 * (index + 1);

        List<Task> allTasks = new ArrayList<>(TasksMap.values());
        // Ensure the end index does not exceed the total number of tasks
        end = Math.min(end, allTasks.size());

        // Return a sublist based on calculated start and end indices
        if (start >= allTasks.size()) {
            return new ArrayList<>(); // Return empty list if start is beyond the number of tasks
        }

        return allTasks.subList(start, end);
    }

    @Override
    public boolean updateTask(Long id) {
        if (TasksMap.containsKey(id)) {
            Task existingTask = TasksMap.get(id);
    
            // Toggle the isDone flag
            existingTask.setIsDone(!existingTask.isDone());
            
            return true; // Indicate success
        }
        return false; // Task not found
    }
    
    @Override
    public void deleteTask(Long id) {
        TasksMap.remove(id);
    }


    @Override
    public List<Task> searchTasks(String name, String priority, boolean state, String date) {
        // Date startDate = parseDate(date); 
        // Date startDate = date;
        List<Task> results = new ArrayList<>();

        // Por cada una de las tareas hacemos un filtro con cada uno de los parametros
        for (Task task : TasksMap.values()) {
            boolean matches = true;

            // Usamos la logica de "contains para la busqueda del nombre de la tarea"
            if (name != null && !name.isEmpty() && !task.getTitle().toLowerCase().contains(name.toLowerCase())) {
                matches = false;
            }

            // Filtramos por la prioridad de la tarea
            if (!"All".equals(priority) && !task.getPriority().equals(priority)) {
                matches = false;
            }

            boolean estadoActual = task.isDone();

            if (state != estadoActual) matches = false;

            /* 
            // Filter by date (only tasks due on or after the specified date)
            if (date != null && task.getDueDate().before(date)) {
                matches = false;
            }
            */

            if (matches) {
                results.add(task);
            }
        }

        return results;
    }


}

