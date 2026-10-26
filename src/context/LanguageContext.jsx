import React, { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // Default to 'kh' (Khmer first)
  const [lang, setLangState] = useState(() => {
    try {
      const saved = localStorage.getItem("wedding_lang");
      if (saved === "en" || saved === "kh") {
        return saved;
      }
    } catch {
      // ignore
    }
    return "kh"; // Khmer first!
  });

  const setLang = (newLang) => {
    if (newLang === "en" || newLang === "kh") {
      setLangState(newLang);
      try {
        localStorage.setItem("wedding_lang", newLang);
      } catch {
        // ignore
      }
    }
  };

  const toggleLang = () => {
    setLang(lang === "kh" ? "en" : "kh");
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
