import './App.css'
import { Header } from './components/Header';
import { Project } from './pages/Project';
import { useState } from 'react';

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  return (
    <>
      <Header setProject={setCurrentPage} />
      {currentPage !== 0 && <Project id={currentPage} />}
    </>
  )
}

export default App
