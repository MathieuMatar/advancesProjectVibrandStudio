import { Routes, Route, useLocation } from "react-router-dom";
import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { Contact } from "./pages/Contact";
import { About } from "./pages/About";
import { Footer } from "./components/Footer";
import { Project } from "./components/Project";

/**
 * Main application component.
 *
 * Sets up routing for the website, including:
 * - Standard pages (Home, Services, Projects, About, Contact, etc.)
 * - Project detail modal popup routing
 * 
 * Handles "background location" logic to display modals (project details)
 * over a previous route while keeping the browser history intact.
 *
 * @component
 * @example
 * <App />
 */
function App() {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  // Detect if the current URL is a project details page
  const isProjectPage = location.pathname.startsWith("/projects/");

  return (
    <>
      {/* Header visible on all pages */}
      <Header />

      {/* Render main pages, or background page if modal is open */}
      <Routes
        location={
          state?.backgroundLocation ||
          (isProjectPage ? ({ pathname: "/projects" } as Location) : location)
        }
      >
        <Route path="/" element={<Home page="home" />} />
        <Route path="/services" element={<Home page="services" />} />
        <Route path="/express" element={<Home page="express" />} />
        <Route path="/clients" element={<Home page="clients" />} />
        <Route path="/projects" element={<Home page="projects" />} />
        <Route path="/ngo" element={<Home page="ngo" />} />
        <Route path="/sacredbranding" element={<Home page="sacredbranding" />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
      </Routes>

      {/* Render project detail modal if needed */}
      {(state?.backgroundLocation || isProjectPage) && (
        <Routes>
          <Route path="/projects/:id" element={<Project />} />
        </Routes>
      )}

      {/* Footer visible on all pages */}
      <Footer />
    </>
  );
}

export default App;
