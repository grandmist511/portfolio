import { GitBranch, Globe, Mail } from "lucide-react";
import "./footer.css";

const socialLinks = [
  {
    href: "https://github.com/grandmist511",
    label: "GitHub",
    icon: GitBranch,
  },
  {
    href: "https://www.linkedin.com/in/ssenkoma-eric-blessings-94264937b",
    label: "LinkedIn",
    icon: Globe,
  },
  {
    href: "mailto:sebbless511@gmail.com",
    label: "Email",
    icon: Mail,
  },
];

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-inner">
        {/* Social Links */}
        <div className="footer-socials">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="footer-social-link"
              aria-label={link.label}
            >
              <link.icon size={20} />
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="footer-divider" aria-hidden="true" />

        {/* Copyright */}
        <p className="footer-copy">
          &copy; {year}  Built by
          grandmist tech &middot; All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
