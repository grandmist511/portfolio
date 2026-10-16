import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import SectionHeading from "../../components/ui/SectionHeading";
import TechTag from "../../components/ui/TechTag";
import RevealOnScroll from "../../components/motion/RevealOnScroll";
import PageTransition from "../../components/motion/PageTransition";
import "./about.css";

const education = [
  {
    period: "2023 — 2026",
    degree: "B.Sc. in Information Technology",
    school: "Mbarara University of Science and Technology",
    desc: "Focused on web development, Application development. Graduated with honors.",
  },
  
];

const frontendSkills = [
  "React",
  "TypeScript",
  "TailwindCSS",
  "CSS",
  "Next.js",
];

const backendSkills = [
  "Express.js",
  "Spring Boot",
  "Java",
  "REST APIs",
];

const databaseSkills = ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Firebase"];

const devopsSkills = ["Docker", "AWS", "CI/CD"];

function About() {
  return (
    <PageTransition>
      <Header />
      <main className="app-main">
        {/* Bio Section */}
        <section className="section">
          <div className="container">
            <SectionHeading 
              title="The Story Behind the Code"
            />

            <div
              style={{
                alignItems: "center",
              }}
              className="about-grid"
            >
              <RevealOnScroll>
                <div>
                  <p
                    style={{
                      fontSize: "var(--font-body-lg)",
                      color: "var(--color-text-secondary)",
                      marginBottom: "var(--space-5)",
                      lineHeight: 1.7,
                    }}
                  >
                    I&apos;m a full-stack developer based in Uganda with
                    expertise spanning modern JavaScript frameworks on the
                    frontend and robust backend systems built with Express.js
                    and Spring Boot.
                  </p>
                  <p
                    style={{
                      fontSize: "var(--font-body-md)",
                      color: "var(--color-text-secondary)",
                      lineHeight: 1.7,
                    }}
                  >
                    My journey into software development began with curiosity
                    about how websites work, which evolved into a passion for
                    building complete, scalable applications. I believe in
                    writing clean, maintainable code and creating experiences
                    that users genuinely enjoy.
                  </p>
                </div>
              </RevealOnScroll>

              <RevealOnScroll delay={0.15}>
                <div
                  className="about-stats"
                >
                  <div className="stat-card">
                    <span
                      className="stat-card-number"
                      style={{
                        fontSize: "var(--font-display-lg)",
                        fontWeight: 600,
                        color: "var(--color-accent)",
                        display: "block",
                        fontFamily: "var(--font-display)",
                      }}
                    >
                      1+
                    </span>
                    <span
                      style={{
                        fontSize: "var(--font-body-sm)",
                        color: "var(--color-text-muted)",
                      }}
                    >
                      Years Experience
                    </span>
                  </div>
                  <div className="stat-card">
                    <span
                      style={{
                        fontSize: "var(--font-display-lg)",
                        fontWeight: 600,
                        color: "var(--color-accent)",
                        display: "block",
                        fontFamily: "var(--font-display)",
                      }}
                    >
                      2
                    </span>
                    <span
                      style={{
                        fontSize: "var(--font-body-sm)",
                        color: "var(--color-text-muted)",
                      }}
                    >
                      Projects Delivered
                    </span>
                  </div>
                  <div className="stat-card">
                    <span
                      style={{
                        fontSize: "var(--font-display-lg)",
                        fontWeight: 600,
                        color: "var(--color-accent)",
                        display: "block",
                        fontFamily: "var(--font-display)",
                      }}
                    >
                      2
                    </span>
                    <span
                      style={{
                        fontSize: "var(--font-body-sm)",
                        color: "var(--color-text-muted)",
                      }}
                    >
                      Happy Clients
                    </span>
                  </div>
                  <div className="stat-card">
                    <span
                      style={{
                        fontSize: "var(--font-display-lg)",
                        fontWeight: 600,
                        color: "var(--color-accent)",
                        display: "block",
                        fontFamily: "var(--font-display)",
                      }}
                    >
                      24/7
                    </span>
                    <span
                      style={{
                        fontSize: "var(--font-body-sm)",
                        color: "var(--color-text-muted)",
                      }}
                    >
                      Support Available
                    </span>
                  </div>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section className="section section--alt">
          <div className="container">
            <SectionHeading
              eyebrow="Education"
              title="Academic Background"
            />

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-5)",
              }}
            >
              {education.map((item, index) => (
                <RevealOnScroll key={item.degree} delay={0.1 * index}>
                  <article
                    className="edu-card"
                    style={{
                      background: "var(--color-surface)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "var(--radius-md)",
                      transition:
                        "all var(--duration-base) var(--ease-out-soft)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "var(--font-mono-sm)",
                        color: "var(--color-accent)",
                        marginBottom: "var(--space-2)",
                        display: "inline-block",
                      }}
                    >
                      {item.period}
                    </span>
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "var(--font-display-md)",
                        fontWeight: 600,
                        marginBottom: "var(--space-1)",
                      }}
                    >
                      {item.degree}
                    </h3>
                    <p
                      style={{
                        fontSize: "var(--font-body-sm)",
                        color: "var(--color-text-secondary)",
                        marginBottom: "var(--space-2)",
                      }}
                    >
                      {item.school}
                    </p>
                    <p
                      style={{
                        fontSize: "var(--font-body-sm)",
                        color: "var(--color-text-muted)",
                        lineHeight: 1.6,
                      }}
                    >
                      {item.desc}
                    </p>
                  </article>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Grid */}
        <section className="section">
          <div className="container">
            <SectionHeading
              eyebrow="Skills"
              title="Tech Stack & Expertise"
            />

            <div
              className="skills-group-grid"
            >
              {[
                { label: "Frontend", skills: frontendSkills },
                { label: "Backend", skills: backendSkills },
                { label: "Database", skills: databaseSkills },
                { label: "DevOps & Cloud", skills: devopsSkills },
              ].map((group, gi) => (
                <RevealOnScroll key={group.label} delay={0.1 * gi}>
                  <div
                    className="skills-group-card"
                    style={{
                      background: "var(--color-surface)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "var(--radius-md)",
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "var(--font-body-sm)",
                        fontWeight: 600,
                        color: "var(--color-accent)",
                        marginBottom: "var(--space-4)",
                        letterSpacing: "0.02em",
                      }}
                    >
                      {group.label}
                    </h3>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "var(--space-2)",
                      }}
                    >
                      {group.skills.map((skill) => (
                        <TechTag key={skill} label={skill} />
                      ))}
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </PageTransition>
  );
}

export default About;
