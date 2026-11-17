import React from 'react';
import { useToast } from '../context/ToastContext';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimes } from 'react-icons/fa';

const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container" role="region" aria-live="polite">
      {toasts.map((toast) => {
        let icon = <FaCheckCircle style={{ color: 'var(--primary-green)', fontSize: '1.2rem', flexShrink: 0 }} />;
        if (toast.type === 'error') {
          icon = <FaExclamationCircle style={{ color: 'var(--danger-red)', fontSize: '1.2rem', flexShrink: 0 }} />;
        } else if (toast.type === 'info') {
          icon = <FaInfoCircle style={{ color: 'var(--info-blue)', fontSize: '1.2rem', flexShrink: 0 }} />;
        }

        return (
          <div key={toast.id} className={`toast toast-${toast.type}`}>
            {icon}
            <span>{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="toast-close"
              aria-label="Close notification"
            >
              <FaTimes />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ToastContainer;
