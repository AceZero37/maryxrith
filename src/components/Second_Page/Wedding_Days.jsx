import React from "react";
import PropTypes from "prop-types";
import "./Second_Page.css";

const TEXTS = {
  kh: {
    title: "សិរីមង្គលអាពាហ៌ពិពាហ៌",
    groomLabel: "កូនប្រុសបង",
    groomName: "សុវណ្ណ ណារិទ្ធ",
    brideLabel: "កូនស្រីបង",
    brideName: "វី ចាន់រី",
    dateLabel: "ថ្ងៃផ្តើមមង្គលការ",
    date: "៣០ ឧសភា ២០២៧",
    location: "ភូមិកោះតូច កោះឧកញ៉ាតី សង្កាត់អរិយក្សត្រ ខេត្ត សៀមរាប",
    viewMore: "មើលបន្ថែម",
  },
  en: {
    title: "The Wedding Day",
    groomLabel: "Groom's Name",
    groomName: "Sovan Narith",
    brideLabel: "Bride's Name",
    brideName: "Vy Chanry",
    dateLabel: "Wedding Date Start at",
    date: "30th May 2027",
    location:
      "Koh Touch Village, Koh Oknha Tei Sangkat, Areykhsat City, Siem Reap",
    viewMore: "View More",
  },
};

const Wedding_Days = ({ lang = "kh" }) => {
  const t = TEXTS[lang] || TEXTS.kh;

  return (
    <div className="wedding-days-bg centered">
      <div className="wedding-days-overlay" />
      <div className="wedding-days-container">
        <h2 className="wedding-days-title">{t.title}</h2>
        <div className="wedding-days-names">
          <div className="wedding-days-person">
            <p className="label">{t.groomLabel}</p>
            <p className="name">{t.groomName}</p>
          </div>
          <div className="wedding-days-and">&amp;</div>
          <div className="wedding-days-person">
            <p className="label">{t.brideLabel}</p>
            <p className="name">{t.brideName}</p>
          </div>
        </div>
        <div className="wedding-days-date">
          <p className="date-label">{t.dateLabel}</p>
          <p className="date">{t.date}</p>
          <p className="location">{t.location}</p>
        </div>
        <div
          className="wedding-days-viewmore"
          onClick={() => {
            const el = document.getElementById("thiep-kar-section");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          title={lang === "kh" ? "ចុចដើម្បីមើលធៀបការ" : "Click to view wedding invitation"}
          role="button"
          tabIndex={0}
        >
          <span>{t.viewMore}</span>
          <div className="mouse-scroll" />
          <div className="mouse-scroll" />
          <div className="mouse-scroll" />
        </div>
      </div>
    </div>
  );
};

Wedding_Days.propTypes = {
  lang: PropTypes.oneOf(["en", "kh"]),
};

export default Wedding_Days;
