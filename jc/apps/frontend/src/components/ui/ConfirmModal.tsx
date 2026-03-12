import React from 'react';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info' | 'success';
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  isOpen,
  title,
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  type = 'danger',
  onConfirm,
  onCancel
}: ConfirmModalProps) {
  if (!isOpen) return null;

  const getTypeConfig = () => {
    switch (type) {
      case 'danger':
        return {
          icon: 'fa-exclamation-triangle',
          iconColor: 'text-danger',
          buttonClass: 'btn-danger'
        };
      case 'warning':
        return {
          icon: 'fa-exclamation-circle',
          iconColor: 'text-warning',
          buttonClass: 'btn-warning'
        };
      case 'info':
        return {
          icon: 'fa-info-circle',
          iconColor: 'text-info',
          buttonClass: 'btn-info'
        };
      case 'success':
        return {
          icon: 'fa-check-circle',
          iconColor: 'text-success',
          buttonClass: 'btn-success'
        };
      default:
        return {
          icon: 'fa-exclamation-triangle',
          iconColor: 'text-danger',
          buttonClass: 'btn-danger'
        };
    }
  };

  const config = getTypeConfig();

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header border-0 pb-0">
            <button
              type="button"
              className="btn-close"
              onClick={onCancel}
            ></button>
          </div>
          <div className="modal-body text-center pt-0">
            <div className="mb-4">
              <i className={`fa ${config.icon} fa-4x ${config.iconColor}`}></i>
            </div>
            <h4 className="mb-3">{title}</h4>
            <p className="text-muted mb-4" style={{ lineHeight: '1.6' }}>
              {message}
            </p>
          </div>
          <div className="modal-footer border-0 pt-0">
            <button
              type="button"
              className="btn btn-outline-secondary me-2"
              onClick={onCancel}
            >
              {cancelText}
            </button>
            <button
              type="button"
              className={`btn ${config.buttonClass}`}
              onClick={onConfirm}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}