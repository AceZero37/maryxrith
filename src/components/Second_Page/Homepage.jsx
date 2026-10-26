import React from "react";
import { Link } from "react-router-dom";
import Content from "./Content";
import FlagSelect from "../Common/FlagSelect";
import { useLanguage } from "../../context/LanguageContext";
import "./Second_Page.css";

const SecondHomepage = () => {
  const { lang } = useLanguage();

  return (
    <div className="second-page-wrapper position-relative">
      {/* Fixed background wallpaper standing with a little black overlay */}
      <div className="second-page-fixed-bg" aria-hidden="true" />
      <div className="second-page-fixed-overlay" aria-hidden="true" />

      {/* Top Navigation Bar: Back to Home & Flag Selector */}
      <nav className="second-page-nav d-flex justify-content-between align-items-center w-100 p-3 p-md-4">
        <Link
          to="/"
          className="second-page-back-btn"
          title={lang === "kh" ? "ត្រឡប់ទៅទំព័រដើម" : "Back to Home"}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span>{lang === "kh" ? "ទំព័រដើម" : "Home"}</span>
        </Link>

        <FlagSelect className="second-page-flag-select" />
      </nav>

      <Content lang={lang} />
    </div>
  );
};

export default SecondHomepage;
