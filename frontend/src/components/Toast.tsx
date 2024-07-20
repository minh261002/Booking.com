import { useEffect } from 'react';
import { XMarkIcon, CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/20/solid';

type ToastProps = {
    message: string;
    type: 'SUCCESS' | 'ERROR';
    onClose: () => void;
};

const Toast = ({ message, type, onClose }: ToastProps) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 5000);

        return () => {
            clearTimeout(timer);
        };
    }, [onClose]);

    const styles = type === 'SUCCESS'
        ? ' fixed top-4 right-4 z-50 p-4 bg-green-500 text-white shadow-lg flex items-center space-x-4 animate-slide-in-right'
        : ' fixed top-4 right-4 z-50 p-4 bg-red-500 text-white shadow-lg flex items-center space-x-4 animate-slide-in-right';

    const Icon = type === 'SUCCESS' ? CheckCircleIcon : ExclamationCircleIcon;

    return (
        <div className={styles}>
            <Icon className="h-6 w-6" />
            <span className="text-md font-medium">{message}</span>
            <button onClick={onClose} className="ml-auto">
                <XMarkIcon className="h-6 w-6" />
            </button>
        </div>
    );
};

export default Toast;
