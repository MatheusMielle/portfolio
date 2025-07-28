import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Projects.css";

interface Project {
  name: string;
  image: string;
  description: string;
  github?: string;
  demo?: string;
}

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch("/projects.json")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error("Error loading projects:", err));
  }, []);

  return (
    <div className="projects-page">
      <Navbar />
      <main className="projects-main">
        <div className="projects-widget">
          <h2 className="section-title">Projects</h2>
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
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-btn"
                    >
                      <i className="bi bi-box-arrow-up-right"></i>
                      <span className="btn-label">Try it out</span>
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
