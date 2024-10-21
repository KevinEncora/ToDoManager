import React from 'react';

interface TaskStatisticsProps {
    averageTime: number;
    taskCounts: { [key: string]: number };
}

const TaskStatistics: React.FC<TaskStatisticsProps> = ({ averageTime, taskCounts }) => {
    return (
        <div>
            <h3>Task Statistics</h3>
            <p>Average Time to Complete: {averageTime} hours</p>
            <h4>Tasks by Priority</h4>
            <ul>
                <li>Low: {taskCounts.Low}</li>
                <li>Medium: {taskCounts.Medium}</li>
                <li>High: {taskCounts.High}</li>
            </ul>
        </div>
    );
};

export default TaskStatistics;
