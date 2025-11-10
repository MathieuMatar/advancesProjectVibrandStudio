import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { Authenticated } from './components/Authenticated';
import { AuthProvider } from './contexts/AuthContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <Authenticated>
        <App />
      </Authenticated>
    </AuthProvider>
  </StrictMode>
);
