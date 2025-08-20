import React from "react";
import "../styles/About.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ResumeWidget from "../components/ResumeWidget";
import { useTranslationSync } from "../hooks/useTranslationSync";
import DOMPurify from "dompurify";

import {
  FaJava,
  FaReact,
  FaDocker,
  FaGitAlt,
  FaRaspberryPi,
  FaPython,
  FaJsSquare,
  FaDatabase,
  FaNode,
} from "react-icons/fa";
import {
  SiCplusplus,
  SiNginx,
  SiJsonwebtokens,
  SiTypescript,
  SiBootstrap,
  SiJira,
} from "react-icons/si";
import { BsLink45Deg } from "react-icons/bs";
import { TbBrandCSharp } from "react-icons/tb";
import { DiDotnet } from "react-icons/di";
import { GrMysql } from "react-icons/gr";
import { BiLogoVisualStudio } from "react-icons/bi";

const About: React.FC = () => {
  const { t } = useTranslationSync("about");

  const aboutItems = t("items", { returnObjects: true }) as string[];
  const techItems = t("tech.items", { returnObjects: true }) as string[];

  return (
    <>
      <Navbar />
      <div className="about-container">
        <div className="about-main">
          <section className="about-section">
            <h1 className="section-title">{t("title")}</h1>

            {aboutItems.map((item, idx) => (
              <p
                key={idx}
                className="about-text"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item) }}
              />
            ))}

            <a href={t("resume.link")} className="download-resume-btn" download>
              <i className="bi bi-download"></i> {t("resume.text")}
            </a>

            <section className="tech-section">
              <h1 className="section-title">{t("tech.title")}</h1>

              <div className="tech-section">

                {/* Languages */}
                <div className="tech-category">
                  <h2>{techItems[0]}</h2>
                  <ul className="tech-list">
                    <li>
                      <SiCplusplus />
                      <span>C++/C</span>
                    </li>
                    <li>
                      <FaJava />
                      <span>Java</span>
                    </li>
                    <li>
                      <TbBrandCSharp />
                      <span>C#</span>
                    </li>
                    <li>
                      <SiTypescript />
                      <span>TypeScript</span>
                    </li>
                    <li>
                      <FaDatabase />
                      <span>SQL</span>
                    </li>
                    <li>
                      <FaJsSquare />
                      <span>JavaScript</span>
                    </li>
                    <li>
                      <FaPython />
                      <span>Python</span>
                    </li>
                  </ul>
                </div>

                {/* Frameworks & Libraries */}
                <div className="tech-category">
                  <h2>{techItems[1]}</h2>
                  <ul className="tech-list">
                    <li>
                      <DiDotnet />
                      <span>ASP.NET Core</span>
                    </li>
                    <li>
                      <FaReact />
                      <span>React</span>
                    </li>
                    <li>
                      <FaDocker />
                      <span>Docker</span>
                    </li>
                    <li>
                      <GrMysql />
                      <span>MySQL</span>
                    </li>
                    <li>
                      <FaNode />
                      <span>Node.js</span>
                    </li>
                    <li>
                      <FaJava />
                      <span>JSP</span>
                    </li>
                    <li>
                      <SiBootstrap />
                      <span>Bootstrap</span>
                    </li>
                  </ul>
                </div>

                {/* Dev Tools */}
                <div className="tech-category">
                  <h2>{techItems[2]}</h2>
                  <ul className="tech-list">
                    <li>
                      <FaGitAlt />
                      <span>Git</span>
                    </li>
                    <li>
                      <BsLink45Deg />
                      <span>REST APIs</span>
                    </li>
                    <li>
                      <SiJsonwebtokens />
                      <span>JWT</span>
                    </li>
                    <li>
                      <FaRaspberryPi />
                      <span>Raspberry Pi</span>
                    </li>
                    <li>
                      <SiNginx />
                      <span>nginx</span>
                    </li>
                    <li>
                      <BiLogoVisualStudio />
                      <span>VS Code</span>
                    </li>
                    <li>
                      <SiJira />
                      <span>Jira</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          </section>

          <ResumeWidget />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
