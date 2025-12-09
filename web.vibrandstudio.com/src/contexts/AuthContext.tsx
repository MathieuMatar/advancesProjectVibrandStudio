import React, { createContext, useContext } from 'react';
import { useLogin } from '../hooks/useLogin';

/**
 * Type of the authentication context, inferred from the `useLogin` hook.
 * @typedef {ReturnType<typeof useLogin>} AuthContextType
 */
type AuthContextType = ReturnType<typeof useLogin>;

/**
 * React context for authentication.
 * Provides access to authentication state and actions.
 * @type {React.Context<AuthContextType | null>}
 */
const AuthContext = createContext<AuthContextType | null>(null);

/**
 * AuthProvider component that wraps its children with the AuthContext.
 * Initializes the authentication state using the `useLogin` hook.
 *
 * @param {{ children: React.ReactNode }} props - The child components to render within the provider.
 * @returns {JSX.Element} The AuthContext provider wrapping the children.
 */
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const auth = useLogin();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

/**
 * Custom hook to access the authentication context.
 * Must be used within an `AuthProvider`.
 *
 * @throws {Error} Throws an error if used outside of an AuthProvider.
 * @returns {AuthContextType} The authentication state and actions from `useLogin`.
 */
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
};

/**
 * Default export of the AuthContext.
 * Can be used for advanced scenarios where `useContext(AuthContext)` is needed.
 */
export default AuthContext;
