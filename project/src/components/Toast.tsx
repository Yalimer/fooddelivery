import React, { useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';

interface Props {
  message: string;
  onClose: () => void;
}

export const Toast: React.FC<Props> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 animate-slide-up z-50">
      <CheckCircle2 className="h-5 w-5" />
      <p>{message}</p>
    </div>
  );
};