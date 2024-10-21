import React from 'react';

interface ConfirmationModalProps {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: '0', left: '0', right: '0', bottom: '0', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '5px'}}>
        <p>{message}</p>

        <div className="d-flex justify-content-center" style={{gap: '100px' }}>
          <button className="btn btn-outline-danger" onClick={onCancel}>Cancel</button>
          <button className="btn btn-outline-success" onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
