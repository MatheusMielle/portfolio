import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useTranslationSync } from "../hooks/useTranslationSync";
import "../styles/Projects.css";

// Import all icon packs used
import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";
import * as BsIcons from "react-icons/bs";
import * as TbIcons from "react-icons/tb";
import * as GrIcons from "react-icons/gr";
import * as DiIcons from "react-icons/di";

interface Projects {
  name: string;
  image?: string;
  description: string;
  github?: string;
  demo?: string;
  tech?: { name: string; icon: string }[];
}

const Projects: React.FC = () => {
  const { t } = useTranslationSync("projects");

  const renderTechIcon = (iconName: string) => {
    const iconPacks = [FaIcons, SiIcons, BsIcons, TbIcons, GrIcons, DiIcons];
    for (const pack of iconPacks) {
      if (pack[iconName as keyof typeof pack]) {
        const Icon = pack[iconName as keyof typeof pack] as React.ComponentType;
        return <Icon />;
      }
    }
    return null;
  };

  const projects: Projects[] = t("items", {
    returnObjects: true,
  }) as Projects[];


  return (
    <div className="projects-page">
      <Navbar />
      <main className="projects-main">
        <div className="projects-widget">
          <h2 className="section-title">{t("title")}</h2>
          <ul className="project-list">
            {projects.map((project, idx) => (
              <li className="project-card" key={idx}>
                <img
                  src={project.image}
                  alt={project.name}
                  className="project-image"
                />
                <div className="project-meta">
                  <strong>{project.name}</strong>
                  <p>{project.description}</p>
                  {project.tech && (
                    <div className="project-tech">
                      <div className="tech-icons">
                        {project.tech.map((tech, techIdx) => (
                          <div key={techIdx} className="tech-item" title={tech.name}>
                            {renderTechIcon(tech.icon)}
                            <span className="tech-name">{tech.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="project-links">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-btn"
                    >
                      <i className="bi bi-github"></i>
                      <span className="btn-label">GitHub</span>
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      rel="noopener noreferrer"
                      className="project-btn"
                    >
                      <i className="bi bi-box-arrow-up-right"></i>
                      <span className="btn-label">{t("try")}</span>
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Projects;
