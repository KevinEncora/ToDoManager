//import React from 'react';
import React, { useEffect, useState } from 'react';

interface Task {
    id: number;
    title: string;
    priority: string | null;
    dueDate: string;
    done: boolean;
}

interface TaskListProps {
    //tasks: Task[];
    onDelete: (id: number) => void;
    onEdit: (id: number) => void;
}


const TaskList: React.FC<TaskListProps> = ({ onDelete, onEdit }) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch -> Para obtener todas las tareas a mostrar obtenidas desde el backend
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch('http://localhost:9090/api/tasks');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data: Task[] = await response.json();
                setTasks(data);
            } 
            catch (error) {
                setError('An unknown error occurred while fetching');
            } 
            finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, []); // Runs once on mount


    if (loading) {
        return <div>Loading tasks...</div>;
    }

    if (error) {
        return <div> Error fetching tasks: {error} </div>
    }

    const handleCheckboxChange = async (id: number) => {
        
        // Buscamos por toda la lista de las tareas para encontrar una con el id que queremos 
        // cuando la encontramos hacemos un switch de el estado actual de esa tarea
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === id ? { ...task, done: !task.done } : task
            )
        );

        /*
        // Send the updated status to the backend
        try {
            const taskToUpdate = tasks.find(task => task.id === id);
            if (taskToUpdate) {
                await fetch(`YOUR_BACKEND_API_ENDPOINT/${id}`, { // Update the URL based on your backend API
                    method: 'PATCH', // Use PATCH for partial updates
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ done: !taskToUpdate.done }), // Send updated done status
                });
            }
        } catch (error: unknown) {
            console.error('Error updating task:', error);
            // Optionally, you could revert the optimistic update here
        }
            */
    };


    return (
        <table className ="table table-hover table-striped">
            <thead>
                <tr style={{textAlign:'center'}}>
                    <th></th>
                    <th>Task Name</th>
                    <th>Priority</th>
                    <th>Due Date</th>
                    <th>Done</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {/* En caso de que todavia no se tengan tareas mostramos dentro de la tabla que no se 
                tienen registros de tareas, para esto hacemos uso del operador ternario */}
                {tasks.length === 0 ? (
                    <tr>
                        <td colSpan={5} style={{ textAlign: 'center', padding: '20px' }}>
                            No hay tareas disponibles
                        </td>
                    </tr>
                
                ) : (
                    tasks.map(task => (
                        <tr key={task.id} style={{textAlign:'center'}}>
                            <td> <button className="btn btn-outline-info" onClick={() => onEdit(task.id)}>Edit</button> </td>    
                            <td>{task.title}</td>
                            <td>{task.priority}</td>
                            <td>{task.dueDate}</td>
                            <td style={{display: 'flex', justifyContent: 'center', alignItems: 'center', padding:'20px'}} >
                                <input 
                                    type="checkbox" 
                                    checked={task.done} 
                                    onChange={() => handleCheckboxChange(task.id)}                                
                                />
                            </td>

                            <td>
                                <div style={{ display: 'flex',alignContent:'center', justifyContent:'center', gap: '20%' }}>
                                    <button className="btn btn-outline-danger" onClick={() => onDelete(task.id)}>Delete</button>
                                </div>
                            </td>

                        </tr>
                    ))
                )}
            </tbody>
        </table>
    );
};

export default TaskList;
