import React from "react";
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import "./First_Page.css";
import { useLanguage } from "../../context/LanguageContext";

const text = {
  kh: {
    initials: "R&R",
    names: "សុវណ្ណ ណារិទ្ធ & វី ចាន់រី",
    join: "សូមចូលរួមពិធីមង្គលការរបស់ពួកយើង",
    button: "មើលបន្ថែម",
    thank: "សូមអរគុណដែលបានចូលរួមថ្ងៃពិសេសរបស់យើង",
  },
  en: {
    initials: "R&R",
    names: "Sovan Narith & Vy Chanry",
    join: "Please Join Our Wedding",
    button: "View More",
    thank: "Thank you for joining us on our special day",
  },
};

const Homepage = () => {
  const { lang } = useLanguage();

  return (
    <div className="first-page-bg d-flex flex-column justify-content-center align-items-center position-relative">
      <div className="first-page-overlay" />
      <Header />
      <Content text={text[lang] || text.kh} lang={lang} />
      <Footer text={text[lang] || text.kh} />
    </div>
  );
};

export default Homepage;
