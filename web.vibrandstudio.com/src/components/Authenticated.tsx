/**
 * Authenticated.tsx
 * 
 * HOC wrapper component that ensures user is authenticated before rendering children.
 * Displays login form if user is not authenticated.
 */

import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Login } from '../components/Login';

/**
 * Authenticated
 * 
 * Higher-order component that wraps content requiring authentication.
 * - Shows loading state while checking authentication
 * - Displays Login component if user is not authenticated
 * - Renders children if user is authenticated
 * 
 * Props:
 * - children: React.ReactNode - Content to display when authenticated
 * 
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Content to render when user is authenticated
 * @returns {JSX.Element} Login component if not authenticated, children otherwise
 * 
 * @example
 * <Authenticated>
 *   <App />
 * </Authenticated>
 */
export function Authenticated({ children }: { children: React.ReactNode }) {
  const { isAuth, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!isAuth) {
    return <Login />;
  }

  return <>{children}</>;
};
