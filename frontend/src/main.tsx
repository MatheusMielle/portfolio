import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

import Home from './pages/Home.tsx'
import About from './pages/About.tsx'
import Projects from './pages/Projects.tsx'
import Resume from './pages/Resume.tsx'
import Contact from './pages/Contact.tsx'
import Login from './pages/Login.tsx';
import Errors from './pages/Errors.tsx';
import Admin from './pages/Admin.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
	      <Route path="/forbidden" element={<Errors statusCode={403} />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<Errors statusCode={404} />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
