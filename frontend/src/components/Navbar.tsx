import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { useTranslationSync } from "../hooks/useTranslationSync";
import "../styles/Navbar.css";

interface NavbarProps {
  permissionLevel?: number | null;
  logout?: () => void;
}

interface Languages{
  code: string;
  name: string;
  icon: string;
}

const languages: Languages[] = [
  { code: "en", name: "English", icon: "fi fi-us" },
  { code: "pt", name: "Português", icon: "fi fi-br" },
  { code: "es", name: "Español", icon: "fi fi-mx" },
  // { code: "fr", name: "Français", icon: "fi fi-fr" },
  // { code: "de", name: "Deutsch", icon: "fi fi-de" },
  // { code: "it", name: "Italiano", icon: "fi fi-it" },
  // { code: "ja", name: "日本語", icon: "fi fi-jp" },
  // { code: "zh", name: "中文", icon: "fi fi-cn" }
];

const Navbar: React.FC<NavbarProps> = ({ permissionLevel, logout }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslationSync("navbar");

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setLanguageDropdownOpen(false);
  };

  const toggleLanguageDropdown = () => {
    setLanguageDropdownOpen(!languageDropdownOpen);
  };

  const selectLanguage = (langCode: string) => {
    setLanguage(langCode);
    setLanguageDropdownOpen(false);
  };

  const currentLang = languages.find(lang => lang.code === language) || languages[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLanguageDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="header-container">
      {/* Logo on the left */}
      <a href="/" className="logo">
        Matheus Mielle 
      </a>

      {/* Hamburger Icon */}
      <div className="hamburger" onClick={toggleMenu}>
        <i
          className={`bi ${menuOpen ? "bi-x" : "bi-list"}`}
          style={{ fontSize: "1.8rem" }}
        ></i>
      </div>

      {/* Nav links (icon-based) */}
      <nav className={`nav ${menuOpen ? "open" : ""}`}>
        <a href="/" className="nav-link" onClick={closeMenu}>
          <span className="nav-link-icon">
            <i className="bi bi-house-fill"></i>
          </span>
          <span className="nav-link-text">{t("home")}</span>
        </a>
        <a href="/about" className="nav-link" onClick={closeMenu}>
          <span className="nav-link-icon">
            <i className="bi bi-person-circle"></i>
          </span>
          <span className="nav-link-text">{t("about")}</span>
        </a>
        <a href="/projects" className="nav-link" onClick={closeMenu}>
          <span className="nav-link-icon">
            <i className="bi bi-file-code-fill"></i>
          </span>
          <span className="nav-link-text">{t("projects")}</span>
        </a>
        {/* <a href="/resume" className="nav-link" onClick={closeMenu}>
          <span className="nav-link-icon">
            <i className="bi bi-file-earmark-text-fill"></i>
          </span>
          <span className="nav-link-text">Resume</span>
        </a> */}
        <a href="/contact" className="nav-link" onClick={closeMenu}>
          <span className="nav-link-icon">
            <i className="bi bi-envelope-paper-fill"></i>
          </span>
          <span className="nav-link-text">{t("contact")}</span>
        </a>

      {/* Don't need language on admin mode */}
      {permissionLevel != null && logout ? (
        // Logout Button
        <button
          type="button"
          onClick={() => {
            closeMenu();
            logout();
          }}
          className="logout-btn"
        >
          <span className="nav-link-icon">
            <i className="bi bi-box-arrow-right"></i>
          </span>
          <span className="nav-link-text">Logout</span>
        </button>
      ) : (
        // Language Dropdown
        <div className="language-dropdown" ref={dropdownRef}>
          <button
            className="language-btn"
            onClick={toggleLanguageDropdown}
          >
            <span className={currentLang.icon}></span>
            <span className="nav-link-text">
              {currentLang.name}
            </span>
            <i className={`bi ${languageDropdownOpen ? "bi-chevron-up" : "bi-chevron-down"}`}></i>
          </button>
          
          {languageDropdownOpen && (
            <div className="language-dropdown-menu">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  className="language-option"
                  onClick={() => selectLanguage(lang.code)}
                >
                  <span className={lang.icon}></span>
                  <span>{lang.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
      </nav>
    </header>
  );
};

export default Navbar;
