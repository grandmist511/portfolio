import { Code, GitBranch, Layers } from "lucide-react";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import Button from "../../components/ui/Button";
import TechTag from "../../components/ui/TechTag";
import RevealOnScroll from "../../components/motion/RevealOnScroll";
import PageTransition from "../../components/motion/PageTransition";
import "./home.css";

const highlights = [
  {
    icon: Layers,
    title: "Full-Stack Developer",
    desc: "Building end-to-end applications with React on the frontend and Express.js / Spring Boot on the backend.",
  },
  {
    icon: Code,
    title: "Clean Architecture",
    desc: "Writing maintainable, scalable code with clear separation of concerns and robust design patterns.",
  },
  {
    icon: GitBranch,
    title: "DevOps Mindset",
    desc: "Experienced with CI/CD pipelines, containerization, and cloud deployment strategies.",
  },
];

const techStack = [
  "React",
  "TypeScript",
  "Express.js",
  "Spring Boot",
  "PostgreSQL",
  "MongoDB",
  "Docker",
  "Kubernetes",
];

function Home() {
  return (
    <PageTransition>
      <Header />
      <main className="app-main">
        {/* Hero Section */}
        <section className="hero section">
          <div className="hero-bg" aria-hidden="true">
            <div className="hero-bg-blob hero-bg-blob--1" />
            <div className="hero-bg-blob hero-bg-blob--2" />
          </div>

          <div className="container">
            <div className="hero-split">
              <div className="hero-content">
                <RevealOnScroll direction="none">
                  <span className="hero-eyebrow"> Hello, I&apos;m</span>
                </RevealOnScroll>

                <RevealOnScroll delay={0.1}>
                  <h1 className="hero-name">
                    Ssenkoma <span className="hero-highlight">Eric</span>
                    <br />
                    Blessings
                  </h1>
                </RevealOnScroll>

                <RevealOnScroll delay={0.2}>
                  <p className="hero-subtitle">
                    A full-stack developer passionate about crafting performant,
                    accessible, and beautifully engineered digital experiences —
                    from polished UIs to robust APIs.
                  </p>
                </RevealOnScroll>

                <RevealOnScroll delay={0.3}>
                  <div className="hero-actions">
                    <Button asLink href="/Projects">
                      View Projects
                    </Button>
                    <Button variant="secondary" asLink href="/Contact">
                      Get In Touch
                    </Button>
                  </div>
                </RevealOnScroll>

                <RevealOnScroll delay={0.4}>
                  <div className="hero-status">
                    <span className="hero-status-dot" />
                    Available for freelance & full-time opportunities
                  </div>
                </RevealOnScroll>

                <RevealOnScroll delay={0.45}>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "var(--space-2)",
                      marginTop: "var(--space-6)",
                    }}
                  >
                    {techStack.map((tech) => (
                      <TechTag key={tech} label={tech} />
                    ))}
                  </div>
                </RevealOnScroll>
              </div>

              {/* Profile Image */}
              <RevealOnScroll delay={0.2} direction="none">
                <div className="hero-image-wrapper">
                  <img
                    src="/images/pic1.jpg"
                    alt="Ssenkoma Eric Blessings"
                    className="hero-image"
                  />
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* Highlights Section */}
        <section className="section section--alt">
          <div className="container">
            <RevealOnScroll direction="none">
              <div className="highlights">
                {highlights.map((item, index) => (
                  <RevealOnScroll
                    key={item.title}
                    delay={0.1 * index}
                    as="article"
                  >
                    <div className="highlight-card">
                      <div className="highlight-card-icon">
                        <item.icon size={24} />
                      </div>
                      <h3 className="highlight-card-title">{item.title}</h3>
                      <p className="highlight-card-desc">{item.desc}</p>
                    </div>
                  </RevealOnScroll>
                ))}
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section">
          <div className="container">
            <div className="cta-section">
              <RevealOnScroll>
                <h2 className="cta-section-title">
                  Let&apos;s Build Something Together
                </h2>
              </RevealOnScroll>

              <RevealOnScroll delay={0.1}>
                <p className="cta-section-desc">
                  Whether you need a web application, API design, or consultancy
                   I&apos;d love to hear about your project.
                </p>
              </RevealOnScroll>

              <RevealOnScroll delay={0.2}>
                <Button asLink href="/Contact" size="lg">
                  Start a Conversation
                </Button>
              </RevealOnScroll>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </PageTransition>
  );
}

export default Home;
