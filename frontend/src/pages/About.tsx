import React from "react";
import "../styles/About.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ResumeWidget from "../components/ResumeWidget";

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
  return (
    <>
      <Navbar />
      <div className="about-container">
        <div className="about-main">
          <section className="about-section">
            <h1 className="section-title">About Me</h1>
            <p className="about-text">
              <>
                Hey! I’m <strong>Matheus Mielle Silva</strong> — a passionate
                developer originally from Belo Horizonte, Brazil, now based in
                Spokane, WA. I speak both Portuguese and English fluently, and I
                recently graduated with a{" "}
                <strong>Bachelor’s in Computer Science</strong> from{" "}
                <strong>Whitworth University</strong>.
                <br />
                <br />
                This past summer, I interned as a{" "}
                <strong>Software Development Engineer at Amazon</strong>, where
                I worked on enhancing the cancellation experience for the
                Digital Subscriptions team — building UI components, integrating
                feedback flows, and writing tests to ensure a smooth user
                experience. Before that, I helped build a research system using
                Raspberry Pi and custom PCBs for an environmental study project
                at <strong>Whitworth University</strong>, in partnership with{" "}
                <strong>Gonzaga University</strong> and{" "}
                <strong>Oregon State University</strong>.
                <br />
                <br />
                I’ve also worked on a variety of personal and academic projects
                — from modernizing legacy systems to building networked games
                and full-stack applications. You can check some of those out on
                the{" "}
                <a href="/projects" className="about-link">
                  <strong>projects tab</strong>
                </a>
                .
                <br />
                <br />
                Outside of tech, you’ll probably find me weightlifting at the
                gym, listening to rock or metal, playing video games, or
                watching Star Wars, Marvel, and other movies and shows. Fun
                fact: this very website is self-hosted on a Raspberry Pi in my
                house in Spokane.
                <br />
                <br />
                Always open to good conversations, tech collaborations, or music
                recommendations. Let’s connect!
              </>
            </p>

            <a href="/resume.pdf" className="download-resume-btn" download>
              <i className="bi bi-download"></i> Download Resume
            </a>

            <section className="tech-section">
              <h1 className="section-title">Tech Stack</h1>

              <div className="tech-section">
                {/* Languages */}
                <div className="tech-category">
                  <h2>Languages</h2>
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
                  <h2>Frameworks & Libraries</h2>
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
                  <h2>Dev Tools</h2>
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
