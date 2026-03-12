import { useState } from 'react';

interface UseConfirmationProps {
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info' | 'success';
}

interface UseToastProps {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

export function useConfirmation() {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<UseConfirmationProps | null>(null);

  const showConfirmation = (props: UseConfirmationProps) => {
    setConfig(props);
    setIsOpen(true);
  };

  const handleConfirm = () => {
    if (config?.onConfirm) {
      config.onConfirm();
    }
    setIsOpen(false);
    setConfig(null);
  };

  const handleCancel = () => {
    setIsOpen(false);
    setConfig(null);
  };

  return {
    isOpen,
    config,
    showConfirmation,
    handleConfirm,
    handleCancel
  };
}

export function useToast() {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<UseToastProps | null>(null);

  const showToast = (props: UseToastProps) => {
    setConfig(props);
    setIsOpen(true);
  };

  const hideToast = () => {
    setIsOpen(false);
    setConfig(null);
  };

  return {
    isOpen,
    config,
    showToast,
    hideToast
  };
}

export function useNotifications() {
  const confirmation = useConfirmation();
  const toast = useToast();

  const showConfirm = (props: UseConfirmationProps) => {
    confirmation.showConfirmation(props);
  };

  const showToast = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info', duration?: number) => {
    toast.showToast({ message, type, duration });
  };

  return {
    showConfirm,
    showToast,
    confirmation,
    toast
  };
}