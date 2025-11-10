import { Routes, Route, useLocation } from "react-router-dom";
import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { Contact } from "./pages/Contact";
import { About } from "./pages/About";
import { Footer } from "./components/Footer";
import { Project } from "./components/Project";

function App() {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  // Detect if the current URL is a project details page
  const isProjectPage = location.pathname.startsWith("/projects/");

  return (
    <>
      <Header />

      {/* Show background page */}
      <Routes location={state?.backgroundLocation || (isProjectPage ? { pathname: "/projects" } as Location : location)}>
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

      {/* Show popup only when needed */}
      {(state?.backgroundLocation || isProjectPage) && (
        <Routes>
          <Route path="/projects/:id" element={<Project />} />
        </Routes>
      )}

      <Footer />
    </>
  );
}

export default App;
