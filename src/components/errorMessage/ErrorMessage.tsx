// import { useEffect } from 'react';
// import toast, { Toaster } from 'react-hot-toast';
import css from './ErrorMessage.module.css';

// interface ErrorMessageProps {
//   message: string;
// }

export default function ErrorMessage() {
  return (
    <p className={css.text}>
      There was an error, please try again...
    </p>
  );
}