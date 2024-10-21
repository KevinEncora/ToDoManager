import React, { useState } from 'react';

const SearchBar: React.FC = () => {
    const [taskName, setTaskName] = useState('');
    const [priority, setPriority] = useState('All');
    const [state, setState] = useState('All');
    const [date, setDate] = useState('');

    const handleSearch = async () => {
        const filters = { name: taskName, priority, state, date };

        const baseUrl = 'http://192.168.0.69:9090/api/tasks/search';
    
        // Build query parameters
        const queryParams = new URLSearchParams({
            name: taskName || '',
            priority,
            state: state.toString(),
            date: date || ''
        });

        try {
            const response = await fetch(`${baseUrl}?${queryParams.toString()}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching tasks:', error);
            throw error;
        }

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
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)} 
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
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)} 
                        >
                            <option>All</option>
                            <option>High</option>
                            <option>Medium</option>
                            <option>Low</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Task Status and Date */}
            <div className="col-sm-12 mt-2">
                <div className="row">
                    {/* Task Status */}
                    <div className="col-6">
                        <label htmlFor="status" className="form-label">Status</label>
                        <select 
                            id="status" 
                            className="form-select" 
                            style={{ border: '2px solid black' }} 
                            value={state}
                            onChange={(e) => setState(e.target.value)} 
                        >
                            <option>All</option>
                            <option>Done</option>
                            <option>Undone</option>
                        </select>
                    </div>

                    {/* Date Input */}
                    <div className="col-6">
                        <label htmlFor="date" className="form-label">From date</label>
                        <input 
                            type="date" 
                            id="date" 
                            className="form-control" 
                            style={{ border: '2px solid black' }} 
                            value={date}
                            onChange={(e) => setDate(e.target.value)} 
                        />
                    </div>
                </div>
            </div>

            {/* Search Button */}
            <div className="col-sm-12 d-flex align-items-center justify-content-center mt-4">
                <button className="btn btn-primary w-25" onClick={handleSearch}>Search</button>
            </div>
        </div>
    );
};

export default SearchBar;
