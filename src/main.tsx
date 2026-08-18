import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './styles.css';
import { reportAppError } from './lib/error-logger';

window.addEventListener('error', (event) => {
  reportAppError(event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  reportAppError(event.reason);
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
