import React, { useEffect, useState } from "react";
import "../styles/ResumeWidget.css";
import "bootstrap-icons/font/bootstrap-icons.css";

interface EducationEntry {
  university: string;
  degree: string;
  dates: string;
  gpa?: string;
  awards?: string[];
}

interface ExperienceEntry {
  title: string;
  company: string;
  location?: string;
  dates: string;
  description?: string[];
}

interface ResumeData {
  education: EducationEntry[];
  experience: ExperienceEntry[];
}

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

const ResumeWidget: React.FC = () => {
  const [resume, setResume] = useState<ResumeData | null>(null);

  useEffect(() => {
    fetch("/resume.json")
      .then((res) => res.json())
      .then((data) => setResume(data))
      .catch((err) => console.error("Failed to load resume:", err));
  }, []);

  if (!resume) return null;

  return (
    <div className="resume-widget">
      <div className="section-container">
        <h1 className="section-title">Education</h1>
        <div className="line-container">
          {resume.education.map((edu, idx) => (
            <div key={idx} className="job-container">
              <h3 className="job-title">
                {edu.degree} <span className="company"> @ {edu.university}</span>
              </h3>
              <p className="job-dates">{edu.dates}</p>
              {/* {edu.gpa && <p><strong>GPA:</strong> {edu.gpa}</p>}
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
        <h1 className="section-title">Experience</h1>
        <div className="line-container">
          {resume.experience.map((exp, idx) => (
            <div key={idx} className="job-container">
              <h3 className="job-title">
                {exp.title} <span className="company"> @ {exp.company}</span>
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
