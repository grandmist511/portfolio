import { Routes, Route, useLocation } from "react-router";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home/home";
import About from "./pages/About/about";
import Projects from "./pages/Projects/projects";
import Contact from "./pages/Contacts/contact";
import NotFound from "./pages/NotFound/notfound";
import "./App.css";

function App() {
  const location = useLocation();

  return (
    <div className="app">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Projects" element={<Projects />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
