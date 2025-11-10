import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Login } from '../components/Login';

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
