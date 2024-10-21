import React from 'react';

const AddTodoButton: React.FC<{ onAdd: () => void }> = ({ onAdd }) => {
    return (
        <div className="mb-3">
            <button className="btn btn-success" onClick={onAdd}>+ New To Do</button>
        </div>
    );
};

export default AddTodoButton;