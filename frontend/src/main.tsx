import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "flag-icons/css/flag-icons.min.css";

import Home from "./pages/Home.tsx";
import About from "./pages/About.tsx";
import Projects from "./pages/Projects.tsx";
import Contact from "./pages/Contact.tsx";
import Login from "./pages/Login.tsx";
import Errors from "./pages/Errors.tsx";
import Admin from "./pages/Admin.tsx";

import { LanguageProvider } from "./hooks/useLanguage.tsx";

import "./i18n.ts"

createRoot(document.getElementById("root")!).render(
  <LanguageProvider>
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forbidden" element={<Errors statusCode={403} />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Errors statusCode={404} />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  </LanguageProvider>
);
