import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  useEffect(() => {
    toast.error(message);
  }, [message]);

  return <Toaster />;
}