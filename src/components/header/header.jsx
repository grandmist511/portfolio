import { useState } from "react";
import { Link, NavLink } from "react-router";
import { motion } from "framer-motion";
import "./header.css";

const navItems = [
  { path: "/", label: "Home" },
  { path: "/About", label: "About" },
  { path: "/Projects", label: "Projects" },
  { path: "/Contact", label: "Contact" },
];

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = () => setMobileOpen(false);

  return (
    <nav className="nav" role="navigation" aria-label="Main navigation">
      <div className="nav-inner">
        {/* Logo */}
        <Link to="/" className="nav-logo" onClick={closeMobile}>
          <img src="/images/grandmist-icon.png" alt="Grandmist Logo" />
        </Link>

        {/* Nav Links */}
        <div className={`nav-links ${mobileOpen ? "nav-links--open" : ""}`}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              onClick={closeMobile}
              className={({ isActive }) =>
                `nav-link ${isActive ? "nav-link--active" : ""}`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="nav-pill"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                  {item.label}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Hamburger Toggle */}
        <button
          className={`nav-toggle ${mobileOpen ? "nav-toggle--open" : ""}`}
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          <span className="nav-toggle-bar" />
          <span className="nav-toggle-bar" />
          <span className="nav-toggle-bar" />
        </button>
      </div>
    </nav>
  );
}

export default Header;

