import React from 'react';

interface ActionButtonsProps {
  onEdit?: () => void;
  onView?: () => void;
  onDelete?: () => void;
  onPrint?: () => void;
  onHistory?: () => void;
  onApprove?: () => void;
  onReject?: () => void;
  showEdit?: boolean;
  showView?: boolean;
  showDelete?: boolean;
  showPrint?: boolean;
  showHistory?: boolean;
  showApprove?: boolean;
  showReject?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function ActionButtons({
  onEdit,
  onView,
  onDelete,
  onPrint,
  onHistory,
  onApprove,
  onReject,
  showEdit = true,
  showView = false,
  showDelete = false,
  showPrint = false,
  showHistory = false,
  showApprove = false,
  showReject = false,
  size = 'sm',
  className = ''
}: ActionButtonsProps) {
  const sizeClass = size === 'sm' ? 'btn-group-sm' : size === 'lg' ? 'btn-group-lg' : '';

  return (
    <div className={`btn-group ${sizeClass} ${className}`}>
      {showEdit && onEdit && (
        <button 
          className="btn btn-outline-warning" 
          onClick={onEdit}
          title="Editar"
        >
          <i className="fa fa-edit"></i>
        </button>
      )}
      {showView && onView && (
        <button 
          className="btn btn-outline-primary" 
          onClick={onView}
          title="Visualizar"
        >
          <i className="fa fa-eye"></i>
        </button>
      )}
      {showPrint && onPrint && (
        <button 
          className="btn btn-outline-info" 
          onClick={onPrint}
          title="Imprimir"
        >
          <i className="fa fa-print"></i>
        </button>
      )}
      {showHistory && onHistory && (
        <button 
          className="btn btn-outline-secondary" 
          onClick={onHistory}
          title="Histórico"
        >
          <i className="fa fa-history"></i>
        </button>
      )}
      {showApprove && onApprove && (
        <button 
          className="btn btn-outline-success" 
          onClick={onApprove}
          title="Aprovar"
        >
          <i className="fa fa-check"></i>
        </button>
      )}
      {showReject && onReject && (
        <button 
          className="btn btn-outline-danger" 
          onClick={onReject}
          title="Rejeitar"
        >
          <i className="fa fa-times"></i>
        </button>
      )}
      {showDelete && onDelete && (
        <button 
          className="btn btn-outline-danger" 
          onClick={onDelete}
          title="Excluir"
        >
          <i className="fa fa-trash"></i>
        </button>
      )}
    </div>
  );
}