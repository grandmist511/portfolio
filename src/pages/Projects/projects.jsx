import { ExternalLink, GitBranch, ArrowRight } from "lucide-react";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import SectionHeading from "../../components/ui/SectionHeading";
import TechTag from "../../components/ui/TechTag";
import RevealOnScroll from "../../components/motion/RevealOnScroll";
import PageTransition from "../../components/motion/PageTransition";
import projectsData from "./data/projects";
import "./projects.css";

function Projects() {
  return (
    <PageTransition>
      <Header />
      <main className="app-main">
        <section className="section">
          <div className="container">
            <SectionHeading
              title="Things I've Built"
            />

            <div className="projects-grid">
              {projectsData.map((project, index) => (
                <RevealOnScroll
                  key={project.id}
                  delay={0.08 * index}
                  as="article"
                >
                  <div className="project-card">
                    {/* Image */}
                    <div className="project-card-image">
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={project.title}
                          loading="lazy"
                        />
                      ) : (
                        <div className="project-card-image-placeholder">
                          <span
                            style={{
                              fontFamily: "var(--font-mono)",
                              fontSize: "var(--font-body-sm)",
                            }}
                          >
                            {project.title
                              .split(" ")
                              .map((w) => w[0])
                              .join("")}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Body */}
                    <div className="project-card-body">
                      <h3 className="project-card-title">{project.title}</h3>
                      <p className="project-card-desc">
                        {project.description}
                      </p>

                      <div className="project-card-tags">
                        {project.tags.map((tag) => (
                          <TechTag key={tag} label={tag} />
                        ))}
                      </div>

                      <div className="project-card-links">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            className="project-card-link"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <GitBranch size={16} />
                            Source
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            className="project-card-link"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink size={16} />
                            Live Demo
                            <ArrowRight
                              size={14}
                              className="project-card-link-arrow"
                            />
                          </a>
                        )}
                      </div>
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

export default Projects;
