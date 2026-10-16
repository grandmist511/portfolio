import { useState } from "react";
import {
  MapPin,
  Mail,
  Phone,
  GitBranch,
  Globe,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import SectionHeading from "../../components/ui/SectionHeading";
import Button from "../../components/ui/Button";
import RevealOnScroll from "../../components/motion/RevealOnScroll";
import PageTransition from "../../components/motion/PageTransition";
import "./contact.css";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "sebbless511@gmail.com",
    href: "mailto:sebbless511@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+256 785771155",
    href: "tel:+256785771155",
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
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formState.name.trim()) newErrors.name = "Name is required";
    if (!formState.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formState.subject.trim()) newErrors.subject = "Subject is required";
    if (!formState.message.trim()) {
      newErrors.message = "Message is required";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    // Simulate submission — replace with actual API call later
    setSubmitted(true);
  };

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

              {/* Contact Form */}
              <RevealOnScroll delay={0.15}>
                {submitted ? (
                  <div className="contact-form">
                    <div className="form-success">
                      <div className="form-success-icon">
                        <CheckCircle size={32} />
                      </div>
                      <h3 className="form-success-title">Message Sent!</h3>
                      <p className="form-success-desc">
                        Thank you for reaching out! I&apos;ll get back to you
                        within 24–48 hours.
                      </p>
                      <Button
                        variant="secondary"
                        onClick={() => {
                          setSubmitted(false);
                          setFormState({
                            name: "",
                            email: "",
                            subject: "",
                            message: "",
                          });
                        }}
                      >
                        Send Another Message
                      </Button>
                    </div>
                  </div>
                ) : (
                  <form
                    className="contact-form"
                    onSubmit={handleSubmit}
                    noValidate
                  >
                    <div
                      className={`form-field ${
                        errors.name ? "form-field--error" : ""
                      }`}
                    >
                      <label className="form-field-label" htmlFor="name">
                        Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        className="form-field-input"
                        placeholder="Your name"
                        value={formState.name}
                        onChange={handleChange}
                      />
                      {errors.name && (
                        <span className="form-field-error-msg">
                          <AlertCircle size={14} />
                          {errors.name}
                        </span>
                      )}
                    </div>

                    <div
                      className={`form-field ${
                        errors.email ? "form-field--error" : ""
                      }`}
                    >
                      <label className="form-field-label" htmlFor="email">
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        className="form-field-input"
                        placeholder="your@email.com"
                        value={formState.email}
                        onChange={handleChange}
                      />
                      {errors.email && (
                        <span className="form-field-error-msg">
                          <AlertCircle size={14} />
                          {errors.email}
                        </span>
                      )}
                    </div>

                    <div
                      className={`form-field ${
                        errors.subject ? "form-field--error" : ""
                      }`}
                    >
                      <label className="form-field-label" htmlFor="subject">
                        Subject
                      </label>
                      <input
                        id="subject"
                        name="subject"
                        type="text"
                        className="form-field-input"
                        placeholder="What's this about?"
                        value={formState.subject}
                        onChange={handleChange}
                      />
                      {errors.subject && (
                        <span className="form-field-error-msg">
                          <AlertCircle size={14} />
                          {errors.subject}
                        </span>
                      )}
                    </div>

                    <div
                      className={`form-field ${
                        errors.message ? "form-field--error" : ""
                      }`}
                    >
                      <label className="form-field-label" htmlFor="message">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        className="form-field-textarea"
                        placeholder="Tell me about your project..."
                        value={formState.message}
                        onChange={handleChange}
                      />
                      {errors.message && (
                        <span className="form-field-error-msg">
                          <AlertCircle size={14} />
                          {errors.message}
                        </span>
                      )}
                    </div>

                    <Button type="submit" size="lg">
                      <Send size={18} />
                      Send Message
                    </Button>
                  </form>
                )}
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
