import React from 'react';

const projects = [
    {
        title: 'Personal Portfolio',
        description: 'A website to showcase my projects and skills.',
        link: 'https://your-portfolio-link.com',
    },
    {
        title: 'E-commerce App',
        description: 'A full-stack e-commerce application with payment integration.',
        link: 'https://your-ecommerce-link.com',
    },
    {
        title: 'Chat Application',
        description: 'A real-time chat app using WebSockets.',
        link: 'https://your-chatapp-link.com',
    },
];

const Projects: React.FC = () => (
    <div style={{ padding: '2rem' }}>
        <h1>Projects</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {projects.map((project, idx) => (
                <div key={idx} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '1rem' }}>
                    <h2>{project.title}</h2>
                    <p>{project.description}</p>
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                        View Project
                    </a>
                </div>
            ))}
        </div>
    </div>
);

export default Projects;