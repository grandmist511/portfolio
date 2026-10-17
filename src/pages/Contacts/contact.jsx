import {
  MapPin,
  Mail,
  GitBranch,
  Globe,
} from "lucide-react";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import SectionHeading from "../../components/ui/SectionHeading";
import RevealOnScroll from "../../components/motion/RevealOnScroll";
import PageTransition from "../../components/motion/PageTransition";
import "./contact.css";

const whatsappUrl = "https://wa.me/256785771155";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
      <path d="M16.04 3C8.87 3 3.04 8.82 3.04 15.98c0 2.29.6 4.52 1.75 6.48L3 29l6.72-1.76a13.02 13.02 0 0 0 6.31 1.62h.01c7.16 0 13-5.82 13-12.98 0-3.47-1.35-6.73-3.81-9.18A12.9 12.9 0 0 0 16.04 3Zm0 23.64h-.01a10.8 10.8 0 0 1-5.5-1.5l-.4-.24-3.99 1.05 1.07-3.89-.26-.4a10.77 10.77 0 0 1-1.66-5.68C5.29 10.03 10.12 5.2 16.05 5.2c2.87 0 5.56 1.12 7.59 3.15a10.66 10.66 0 0 1 3.14 7.58c0 5.94-4.83 10.71-10.74 10.71Zm5.9-8.03c-.32-.16-1.9-.94-2.2-1.05-.3-.11-.51-.16-.73.16-.22.32-.84 1.05-1.03 1.27-.19.21-.38.24-.7.08-.32-.16-1.36-.5-2.59-1.59-.96-.85-1.61-1.9-1.8-2.22-.19-.32-.02-.49.14-.65.14-.14.32-.38.48-.56.16-.19.21-.32.32-.54.1-.21.05-.4-.03-.56-.08-.16-.73-1.75-1-2.4-.26-.63-.53-.54-.73-.55h-.62c-.21 0-.56.08-.86.4-.3.33-1.13 1.1-1.13 2.68s1.16 3.1 1.32 3.31c.16.22 2.28 3.49 5.52 4.89.77.33 1.37.53 1.84.68.77.24 1.47.21 2.02.13.62-.09 1.9-.78 2.17-1.53.27-.75.27-1.4.19-1.53-.08-.14-.3-.22-.62-.38Z" />
    </svg>
  );
}

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "sebbless511@gmail.com",
    href: "mailto:sebbless511@gmail.com",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Kawempe ,Kampala",
  },
];

const socialLinks = [
  { icon: GitBranch, href: "https://github.com/grandmist511", label: "GitHub" },
  {
    icon: Globe,
    href: "https://www.linkedin.com/in/ssenkoma-eric-blessings-94264937b",
    label: "LinkedIn",
  },
  
];

function Contact() {
  return (
    <PageTransition>
      <Header />
      <main className="app-main">
        <section className="section">
          <div className="container">
            <SectionHeading
              title="Let's Work Together"
            />

            <div className="contact-grid">
              {/* Contact Info */}
              <RevealOnScroll>
                <div className="contact-info">
                  {contactInfo.map((item) => (
                    <div key={item.label} className="contact-info-item">
                      <div className="contact-info-icon">
                        <item.icon size={20} />
                      </div>
                      <div>
                        <p className="contact-info-label">{item.label}</p>
                        <p className="contact-info-value">
                          {item.href ? (
                            <a href={item.href}>{item.value}</a>
                          ) : (
                            item.value
                          )}
                        </p>
                      </div>
                    </div>
                  ))}

                  {/* Social Links */}
                  <div className="contact-socials">
                    {socialLinks.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        className="contact-socials-link"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.label}
                      >
                        <link.icon size={20} />
                      </a>
                    ))}
                  </div>
                </div>
              </RevealOnScroll>

              {/* WhatsApp Contact */}
              <RevealOnScroll delay={0.15}>
                <div className="whatsapp-card">
                  <div className="whatsapp-card-icon" aria-hidden="true">
                    <WhatsAppIcon />
                  </div>
                  <h2 className="whatsapp-card-title">Let&apos;s chat on WhatsApp</h2>
                  <p className="whatsapp-card-description">
                    Have a project in mind or just want to say hello? Message me
                    directly on WhatsApp.
                  </p>
                  <a
                    className="whatsapp-link"
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <WhatsAppIcon />
                    Chat on WhatsApp
                  </a>
                  <p className="whatsapp-card-note">
                    Opens WhatsApp on your device, or WhatsApp Web.
                  </p>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </PageTransition>
  );
}

export default Contact;
