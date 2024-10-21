import React, { useState } from 'react';
import TaskList from './TaskList';

interface AddTaskProps {
    show: boolean;
    handleClose: () => void;
}

const AddTask: React.FC<AddTaskProps> = ({ show, handleClose }) => {

    const [taskName, setTaskName] = useState('');
    const [priority, setPriority] = useState('low');
    const [dueDate, setDueDate] = useState('');
    const [creationDate, setCreationDate] = useState('');
    const [isDone, setIsDone] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Creamos una nueva instancia de la tarea que vamos a crear
        const newTask = {
            "title": taskName,
            "priority": priority,
            "dueDate": dueDate,
            "creationDate" : new Date().toISOString(),
            //"creationDate": "2024-10-01",
            "isDone" : false
        };

        // Creamos un trycatch para la conexion con el backend
        try {

            // Hacemos la conexion con el back
            const response = await fetch('http://localhost:9090/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTask),
            });
        

            // Mandamos la informacion al back y leemos la respuesta dada
            const text = await response.text();
            
            /*
            console.log('Response status:', response.status);
            console.log('Response body:', text); 
            */
        
            // En caso de que la operacion no sea aceptada mostramos un error en pantalla
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }
        
            // (Posible cambio) -> Desde el back no retorno nada
            // Dependiendo de si la respuesta contiene informacion la mostramos como resultado
            let result = null;
            if (text) {
                result = JSON.parse(text);
            }
        
            console.log('Task added:', result);
            
            // Hacemos reset de los cambios hechos en el form despues de agregar la tarea correctamente a la BD
            setTaskName('');
            setPriority('low');
            setDueDate('');
        }

        catch (error) {
            // Mostramos el error al momento de querer agregar una nueva tarea
            console.error('Error adding task:', error);
        }

        // Cerramos el modal cuando se haga click en 'Aceptar'
        handleClose();
    };

    // En caso de que la bandera para mostrar el modal sea falso, no regresamos nada
    if (!show) return null;

    return (
        <div id="myModal" className="modal fade show" style={{ display: 'block'}} aria-labelledby="exampleModalLabel" aria-hidden="false">

        <div className="modal-dialog modal-lg">
            <div className="modal-content">

                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Detalles de la tarea</h5>

                    <button style={{marginLeft: 'auto'}} type="button" className="close" onClick={handleClose} aria-label="Close">
                        <span>&times;</span>
                    </button>
                
                </div>

                <div className="modal-body">
                    <form id="taskForm" onSubmit={handleSubmit}>

                        {/* Input para el nombre de la tarea */ }

                        <div className="form-group">
                            <label htmlFor="taskName">Name:</label>
                            <input
                                type="text"
                                id="taskName"
                                className="form-control"
                                value={taskName}
                                style={{ border: '1px solid black', marginBottom:'2%'}} 
                                onChange={(e) => setTaskName(e.target.value)}
                                required
                            />
                        </div>
    
                        {/*  Selector para la prioridad de la tarea */}

                        <div className="form-group">
                            <label htmlFor="priority">Priority:</label>
                            <select
                                id="priority"
                                className="form-control"
                                value={priority}
                                style={{ border: '1px solid black', marginBottom:'2%'}} 
                                onChange={(e) => setPriority(e.target.value)}
                            >
                                <option selected value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
    
                        {/*  Indicar la posible fecha de termino de la tarea a crear */}

                        <div className="form-group">
                            <label htmlFor="dueDate">Due Date:</label>
                            <input
                                type="date"
                                id="dueDate"
                                className="form-control"
                                value={dueDate}
                                style={{ border: '1px solid black', marginBottom:'2%'}} 
                                onChange={(e) => setDueDate(e.target.value)}
                            />
                        </div>


                        {/* Checkbox para determinar la tarea ya fue realizada */}

                        {/*
                        <div className="form-group form-check">
                            <input
                                type="checkbox"
                                id="isDone"
                                className="form-check-input"
                                checked={isDone}
                                style={{ border: '1px solid black', marginBottom:'2%'}} 
                                onChange={(e) => setIsDone(e.target.checked)}
                            />

                            <label 
                                className="form-check-label"
                                htmlFor="isDone"
                                style={{marginBottom:'2%'}} 
                            >Done</label>

                        </div>
                        */}

                        { /* Boton para terminar el proceso de agregar una tarea */ }
    
                        <button type="submit" className="btn btn-primary">Save Changes</button>
                    </form>
                </div>

            </div>
        </div>
    </div>
    );
};

export default AddTask;
