import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    // children?: React.ReactNode; // Remove this line if not needed
}


const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div>
            <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
                Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                Next
            </button>
        </div>
    );
};

export default Pagination;
