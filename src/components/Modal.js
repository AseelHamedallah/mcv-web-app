import React from 'react';
import styles from '../styles/Modal.module.css';


const Modal = ({ onClose, onConfirm }) => {
    return (
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <p>Are you sure you want to delete this item?</p>
          <div>
            <button onClick={onConfirm}>Delete</button>
            <button onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
    );
  };

export default Modal;