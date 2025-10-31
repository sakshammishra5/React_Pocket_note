import React, { useContext } from 'react';
import { noteContext } from '../../App';
import Modal from '../Modal/Modal';
import './GroupForm.css'; // Optional: Add styling for GroupForm

const GroupForm = () => {
  const { setIsModalOpen } = useContext(noteContext);

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
      <Modal>
        <h2>Modal Content</h2>
        <p style={{ color: 'black', fontSize: '16px' }}>
          jsjscbscxns {/* Ensure text is visible */}
        </p>
      </Modal>
    </div>
  );
};

export default GroupForm;