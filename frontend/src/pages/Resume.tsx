import React from 'react';

const Resume: React.FC = () => {
    return (
        <main style={{ maxWidth: 800, margin: '0 auto', padding: 24 }}>
            <h1>My Resume</h1>
            <section>
                <h2>Contact</h2>
                <ul>
                    <li>Email: your.email@example.com</li>
                    <li>LinkedIn: linkedin.com/in/yourprofile</li>
                    <li>GitHub: github.com/yourusername</li>
                </ul>
            </section>
            <section>
                <h2>Summary</h2>
                <p>
                    Experienced software developer with a passion for building scalable web applications and working with modern technologies.
                </p>
            </section>
            <section>
                <h2>Skills</h2>
                <ul>
                    <li>TypeScript, JavaScript, React, Node.js</li>
                    <li>HTML, CSS, SASS</li>
                    <li>REST APIs, GraphQL</li>
                    <li>Git, Docker</li>
                </ul>
            </section>
            <section>
                <h2>Experience</h2>
                <h3>Software Engineer - Company Name</h3>
                <p>Jan 2022 - Present</p>
                <ul>
                    <li>Developed and maintained web applications using React and Node.js.</li>
                    <li>Collaborated with cross-functional teams to deliver high-quality products.</li>
                </ul>
                <h3>Frontend Developer - Another Company</h3>
                <p>Jun 2020 - Dec 2021</p>
                <ul>
                    <li>Implemented responsive UI components with React and TypeScript.</li>
                    <li>Worked closely with designers to improve user experience.</li>
                </ul>
            </section>
            <section>
                <h2>Education</h2>
                <p>B.Sc. in Computer Science, University Name, 2016 - 2020</p>
            </section>
        </main>
    );
};

export default Resume;