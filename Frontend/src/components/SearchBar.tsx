import React, { useState } from 'react';

const SearchBar: React.FC<{ onSearch: (filters: { name: string; priority: string; state: string }) => void }> = ({ onSearch }) => {
    const [taskName, setTaskName] = useState('');
    const [priority, setPriority] = useState('All');
    const [state, setState] = useState('All');

    const handleSearch = () => {
        onSearch({ name: taskName, priority, state });
    };

   return (
        <div className="row mb-4" style={{ border: '2px solid black', paddingBottom: '20px' }}>
            
            {/* Task Name */}
            <div className="col-sm-12">
                <label htmlFor="name" className="form-label">Name</label>
                <input 
                    type="text" 
                    id="name" 
                    className="form-control" 
                    placeholder="Name" 
                    style={{ border: '2px solid black' }} 
                />
            </div>

            {/* Task Priority */}
            <div className="col-sm-12 mt-2">
                <div className="row">
                    <div className="col-6">
                        <label htmlFor="priority" className="form-label">Priority</label>
                        <select 
                            id="priority" 
                            className="form-select" 
                            style={{ border: '2px solid black' }} 
                        >
                            <option selected>All</option>
                            <option>High</option>
                            <option>Medium</option>
                            <option>Low</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Task Status and Button */}
            <div className="col-sm-12 mt-2">
                <div className="row">
                    {/* Task Status */}
                    <div className="col-6">
                        <label htmlFor="status" className="form-label">Status</label>
                        <select 
                            id="status" 
                            className="form-select" 
                            style={{ border: '2px solid black' }} 
                        >
                            <option selected>All</option>
                            <option>Done</option>
                            <option>Undone</option>
                        </select>
                    </div>

                    {/* Search Button */}
                    <div className="col-6 d-flex align-items-center justify-content-center mt-4" >
                        <button className="btn btn-primary w-25">Search</button>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default SearchBar;
