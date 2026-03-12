import React, { useEffect } from 'react';

interface ToastProps {
  isOpen: boolean;
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  onClose: () => void;
}

export default function Toast({
  isOpen,
  message,
  type = 'success',
  duration = 3000,
  onClose
}: ToastProps) {
  useEffect(() => {
    if (isOpen && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);

  if (!isOpen) return null;

  const getTypeConfig = () => {
    switch (type) {
      case 'success':
        return {
          icon: 'fa-check-circle',
          bgClass: 'bg-success',
          textClass: 'text-white'
        };
      case 'error':
        return {
          icon: 'fa-times-circle',
          bgClass: 'bg-danger',
          textClass: 'text-white'
        };
      case 'warning':
        return {
          icon: 'fa-exclamation-triangle',
          bgClass: 'bg-warning',
          textClass: 'text-dark'
        };
      case 'info':
        return {
          icon: 'fa-info-circle',
          bgClass: 'bg-info',
          textClass: 'text-white'
        };
      default:
        return {
          icon: 'fa-check-circle',
          bgClass: 'bg-success',
          textClass: 'text-white'
        };
    }
  };

  const config = getTypeConfig();

  return (
    <div 
      className="position-fixed top-0 end-0 p-3" 
      style={{ zIndex: 1055, marginTop: '80px' }}
    >
      <div className={`toast show ${config.bgClass} ${config.textClass}`}>
        <div className="toast-body d-flex align-items-center">
          <i className={`fa ${config.icon} me-3`}></i>
          <div className="flex-grow-1">
            {message}
          </div>
          <button
            type="button"
            className={`btn-close ${config.textClass === 'text-white' ? 'btn-close-white' : ''} ms-2`}
            onClick={onClose}
          ></button>
        </div>
      </div>
    </div>
  );
}