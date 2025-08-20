import React, { useState } from "react";
import "../styles/ResumeWidget.css";
import { useTranslationSync } from "../hooks/useTranslationSync";

const BulletPoint: React.FC<{ text: string }> = ({ text }) => {
  const [expanded, setExpanded] = useState(false);

  const words = text.split(" ");
  const preview = words.slice(0, 7).join(" ") + (words.length > 7 ? "..." : "");

  return (
    <li className="bullet-point" onClick={() => setExpanded(!expanded)}>
      <i
        className={`bi ${
          expanded ? "bi-caret-down-fill" : "bi-caret-right-fill"
        } bullet-icon`}
      ></i>
      <span className={`bullet-text ${expanded ? "expanded" : ""}`}>
        {expanded ? text : preview}
      </span>
    </li>
  );
};

interface EducationItem {
  university: string;
  degree: string;
  dates: string;
  gpa?: string;
  awards?: string[];
}

interface ExperienceItem {
  title: string;
  company: string;
  location?: string;
  dates: string;
  description?: string[];
}

const ResumeWidget: React.FC = () => {
  const { t } = useTranslationSync("about");

  const educationItems: EducationItem[] = t("education.items", {
    returnObjects: true,
  }) as EducationItem[];

  const experienceItems: ExperienceItem[] = t("experience.items", {
    returnObjects: true,
  }) as ExperienceItem[];

  return (
    <div className="resume-widget">
      <div className="section-container">
        <h1 className="section-title">{t("education.title")}</h1>
        <div className="line-container">
          {educationItems.map((edu, idx) => (
            <div key={idx} className="job-container">
              <h3 className="job-title">
                {edu.degree}{" "}
                <span className="company"> - {edu.university}</span>
              </h3>
              <p className="job-dates">{edu.dates}</p>
              {/* {edu.gpa && (
                <p>
                  <strong>GPA:</strong> {edu.gpa}
                </p>
              )}
              {edu.awards && (
                <ul>
                  {edu.awards.map((award, i) => (
                    <BulletPoint key={i} text={award} />
                  ))}
                </ul>
              )} */}
            </div>
          ))}
        </div>
      </div>

      <div className="section-container">
        <h1 className="section-title">{t("experience.title")}</h1>
        <div className="line-container">
          {experienceItems.map((exp, idx) => (
            <div key={idx} className="job-container">
              <h3 className="job-title">
                {exp.title}
                <span className="company"> - {exp.company}</span>
              </h3>
              <p className="job-dates">{exp.dates}</p>
              {exp.description && (
                <ul>
                  {exp.description.map((desc, i) => (
                    <BulletPoint key={i} text={desc} />
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResumeWidget;
