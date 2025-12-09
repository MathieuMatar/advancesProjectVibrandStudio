/**
 * main.tsx
 * 
 * Application entry point. Initializes React, sets up providers, and mounts the app.
 * Registers the service worker for PWA offline functionality.
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { Authenticated } from './components/Authenticated';
import { AuthProvider } from './contexts/AuthContext';

// Register the service worker for offline caching
import { registerSW } from 'virtual:pwa-register';

/**
 * Initialize and register the service worker for PWA functionality.
 * Provides offline caching and background sync capabilities.
 */
registerSW({
  onRegistered(r) {
    console.log('Service Worker registered:', r);
  },
  onRegisterError(error) {
    console.error('SW registration failed:', error);
  }
});

/**
 * Render the React application with necessary providers:
 * - AuthProvider: Handles authentication context and JWT token management
 * - Authenticated: Wraps app to ensure user is logged in before accessing it
 * - App: Main application component with routing and state management
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <Authenticated>
        <App />
      </Authenticated>
    </AuthProvider>
  </StrictMode>
);
