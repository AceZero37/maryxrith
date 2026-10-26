import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";
import "./FlagSelect.css";

const LANGUAGES = [
  {
    code: "kh",
    label: "ខ្មែរ",
    fullName: "ភាសាខ្មែរ",
    subLabel: "Khmer",
    flag: "/assets/flags/kh.svg",
    alt: "Cambodia Flag",
  },
  {
    code: "en",
    label: "EN",
    fullName: "English",
    subLabel: "English",
    flag: "/assets/flags/en.svg",
    alt: "English Flag",
  },
];

const FlagSelect = ({ className = "" }) => {
  const { lang, setLang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentLang = LANGUAGES.find((item) => item.code === lang) || LANGUAGES[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleSelect = (code) => {
    setLang(code);
    setIsOpen(false);
  };

  return (
    <div
      className={`flag-select-container ${className}`}
      ref={dropdownRef}
      aria-label="Language Selector"
    >
      {/* Trigger Button */}
      <button
        type="button"
        className={`flag-select-trigger ${isOpen ? "is-open" : ""}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        title="Select Language / ជ្រើសរើសភាសា"
      >
        <span className="flag-img-wrapper">
          <img
            src={currentLang.flag}
            alt={currentLang.alt}
            className="flag-icon"
          />
        </span>
        <span className="flag-current-label">{currentLang.label}</span>
        <svg
          className={`flag-arrow-icon ${isOpen ? "rotated" : ""}`}
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.5 4.5L6 8L9.5 4.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <ul
          className="flag-select-dropdown"
          role="listbox"
          aria-label="Select a language"
        >
          <div className="flag-dropdown-header">
            <span>{lang === "kh" ? "ជ្រើសរើសភាសា" : "Select Language"}</span>
          </div>
          {LANGUAGES.map((item) => {
            const isSelected = item.code === lang;
            return (
              <li
                key={item.code}
                role="option"
                aria-selected={isSelected}
                tabIndex={0}
                className={`flag-select-option ${isSelected ? "selected" : ""}`}
                onClick={() => handleSelect(item.code)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleSelect(item.code);
                  }
                }}
              >
                <div className="flag-option-left">
                  <span className="flag-img-wrapper">
                    <img
                      src={item.flag}
                      alt={item.alt}
                      className="flag-icon"
                    />
                  </span>
                  <div className="flag-option-text">
                    <span className="flag-primary-text">{item.fullName}</span>
                    <span className="flag-sub-text">{item.subLabel}</span>
                  </div>
                </div>

                {isSelected && (
                  <span className="flag-check-icon" aria-hidden="true">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.5 8.5L6.5 11.5L12.5 4.5"
                        stroke="#ffe873"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default FlagSelect;
