/**
 * App.tsx
 * 
 * Main application component that handles routing and page display.
 * Integrates authentication, global state, and main UI components.
 */

import './App.css';
import { Header } from './components/Header';
import { Project } from './pages/Project';
import { AddProject } from './pages/AddProject';
import { ChangePassword } from './pages/ChangePassword';
import { ErrorNotification } from './components/ErrorNotification';

import { useApp } from './hooks/useApp';
import { useEffect } from 'react';

/**
 * App
 * 
 * Root component for the application. Manages navigation between different pages:
 * - Home (currentPage = 0): Shows header with project navigation
 * - Add Project (currentPage = -1): Form to create a new project
 * - Change Password (currentPage = -2): Form to change user password
 * - Project View (currentPage > 0): Displays the selected project with tasks, milestones, etc.
 * 
 * Sets document title based on logged-in user name.
 * 
 * @component
 * @returns {JSX.Element} The main app component wrapped with routing and state
 * 
 * @example
 * // In main.tsx
 * import App from './App'
 * createRoot(document.getElementById('root')).render(<App />)
 */
function App() {

  //get the page title
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userName = JSON.parse(storedUser).user.name;
      const capitalizedUserName = userName.charAt(0).toUpperCase() + userName.slice(1);
      document.title = `${capitalizedUserName} | Vibrand Studio`;
    }
  }, []);



  const {
    currentPage,
    setCurrentPage,
    globalError,
    setGlobalError
  } = useApp();

  return (
    <>
      <ErrorNotification
        error={globalError}
        onClose={() => setGlobalError(null)}
      />

      <Header
        key={currentPage}
        setProject={setCurrentPage}
      />

      {currentPage === -1 && (
        <AddProject setProject={setCurrentPage} />
      )}

      {currentPage === -2 && <ChangePassword />}

      {currentPage > 0 && (
        <Project id={currentPage} />
      )}
    </>
  );
}

export default App;
