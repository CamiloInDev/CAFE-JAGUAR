import { useEffect, useState } from 'react';
import { Check, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error';
  onClose: () => void;
}

export function Toast({ message, type = 'success', onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transform transition-all duration-300 ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
    >
      <div
        className={`flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl shadow-[#122C9B]/20 border ${
          type === 'success'
            ? 'bg-white border-[#122C9B]/10'
            : 'bg-white border-red-200'
        }`}
      >
        <span
          className={`p-2 rounded-xl ${
            type === 'success' ? 'bg-[#FFA42C]' : 'bg-red-500'
          }`}
        >
          {type === 'success' ? (
            <Check className="w-4 h-4 text-white" strokeWidth={3} />
          ) : (
            <X className="w-4 h-4 text-white" strokeWidth={3} />
          )}
        </span>
        <p className="text-sm font-medium text-[#122C9B] pr-2">{message}</p>
      </div>
    </div>
  );
}

interface ToastData {
  id: number;
  message: string;
  type?: 'success' | 'error';
}

let toastId = 0;
const listeners: Set<(toasts: ToastData[]) => void> = new Set();
let currentToasts: ToastData[] = [];

export function showToast(message: string, type?: 'success' | 'error') {
  const toast: ToastData = { id: ++toastId, message, type };
  currentToasts = [...currentToasts, toast];
  listeners.forEach(listener => listener(currentToasts));
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  useEffect(() => {
    listeners.add(setToasts);
    return () => {
      listeners.delete(setToasts);
    };
  }, []);

  const removeToast = (id: number) => {
    currentToasts = currentToasts.filter(t => t.id !== id);
    listeners.forEach(listener => listener(currentToasts));
  };

  return (
    <>
      {toasts.map(toast => {
        const { id, ...rest } = toast;
        return (
          <Toast
            key={id}
            {...rest}
            onClose={() => removeToast(id)}
          />
        );
      })}
    </>
  );
}
