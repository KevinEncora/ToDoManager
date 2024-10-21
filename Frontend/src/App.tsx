import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import SearchBar from './components/SearchBar';
import AddTodoButton from './components/AddTodoButton';
import TaskList from './components/TaskList';
import AddTask from './components/addTask';
import ConfirmationModal from './components/ConfirmationModal';
import TaskStatistics from './components/TaskStatistics';
import Pagination from './components/Pagination';


interface Task {
    id: number;
    title: string;
    priority: string | null;
    dueDate: string;
    done: boolean;
}

const App: React.FC = () => {
    // Control para mostrar el modal que hace referencia a agregar una nueva tarea
    const [showModal, setShowModal] = useState(false);
    
    // Control para mostrar el modal de confirmación de eliminación
    const [isModalConfirmationOpen, setIsModalConfirmationOpen] = useState(false);
    
    // Estado para almacenar el ID de la tarea a eliminar
    const [taskToDelete, setTaskToDelete] = useState<number | null>(null);
    const [taskToUpdate, setTaskToUpdate] = useState<number | null>(null);

    // Function para mostrar y quitar la visibilidad al modal de agregar tarea
    const handleClose = () => setShowModal(false); 
    const handleCreateTask = () => setShowModal(true);

    // Function para manejar la eliminación de tareas
    const handleDelete = (id: number) => {
        setTaskToDelete(id); 
        setIsModalConfirmationOpen(true);
    };

    // Function para confirmar la eliminación de la tarea
    const confirmDelete = async () => {
        if (taskToDelete !== null) {
            // Send the updated status to the backend
            try {
                const response = await fetch(`http://localhost:9090/api/tasks/${taskToDelete}`, {
                    method: 'DELETE'
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                
            } 
            catch (error) {
                console.log(error);
            } 
        }
        

        //console.log(`Delete task with id: ${taskToDelete}`);
        setTaskToDelete(null); // Reiniciar el estado
        
        setIsModalConfirmationOpen(false); // Cerrar el modal de confirmación
    };

    // Function para cancelar la eliminación
    const cancelDelete = () => {
        setTaskToDelete(null); // Reiniciar el estado
        setIsModalConfirmationOpen(false); // Cerrar el modal de confirmación
    };

    // Function para manejar la edición de tareas
    const handleEdit =  async (id: number) => {
        try {
            const response = await fetch(`http://localhost:9090/api/tasks/search/${id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data: Task = await response.json();
            console.log(data);
            
        } 
        catch (error) {
            console.log ('An unknown error occurred while fetching');
        }
    };

    return (
        <div className="container mt-4">
            {/* Componente para la busqueda de las tareas dependiendo filtros */}
            <SearchBar />
            
            {/* Componente del boton para agregar una nueva tarea */}
            <AddTodoButton onAdd={handleCreateTask} />
            
            {/* Agregamos el modal para la creación de las tareas */}
            <AddTask show={showModal} handleClose={handleClose} />
            
            {/* Componente para mostrar todas las tareas que se tienen */}
            <TaskList onDelete={handleDelete} onEdit={handleEdit} id={undefined} />
            
            {/* Modal de confirmación para la eliminación */}
            <ConfirmationModal
                isOpen={isModalConfirmationOpen}
                message="Are you sure you want to delete this task?"
                onConfirm={confirmDelete} // Llamar a la función de confirmación
                onCancel={cancelDelete} // Llamar a la función de cancelación
            />

            <Pagination 
                currentPage={1} 
                totalPages={1} 
                onPageChange={(page: number) => {
                    throw new Error('Function not implemented.');
                }} 
            />


            <TaskStatistics averageTime={0} taskCounts={{}}/>

        </div>
    );
};

export default App;
