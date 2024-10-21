import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import SearchBar from './components/SearchBar';
import AddTodoButton from './components/AddTodoButton';
import TaskList from './components/TaskList';
import AddTask from './components/addTask';

const App: React.FC = () => {
    // Control para mostrar el modal que hace referencia a agregar una nueva tarea
    const [showModal, setShowModal] = useState(false);

    // Function para mostrar y quitar la visibilidad al modal de agregar tarea
    const handleClose = () => setShowModal(false); 
    const handleCreateTask = () => setShowModal(true);

    
    // Example delete function
    const handleDelete = (id: number) => {
        console.log(`Delete task with id: ${id}`);
        // Implement delete logic here
    };

    // Example edit function
    const handleEdit = (id: number) => {
        console.log(`Edit task with id: ${id}`);
        // Implement edit logic here
    };


    return (
        <div className="container mt-4">

            {/* Componente para la busqueda de las tareas dependiendo filtros */}
            <SearchBar onSearch={function (filters: { name: string; priority: string; state: string; }): void {
                throw new Error('Function not implemented.');
            } } />

            {/* Componente del boton para agragar una nueva tarea */}
            <AddTodoButton onAdd={handleCreateTask} />

            {/* Agregamos el modal para la creacion de las tareas */}
            <AddTask show={showModal} handleClose={handleClose} />

            {/* Componente para mostrar todas las tareas que se tienen */}
            <TaskList onDelete={handleDelete} onEdit={handleEdit} />

        </div>
    );
};

export default App;
