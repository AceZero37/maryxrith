import React, { useState, useEffect } from "react";
import "./ThiepKar.css";

const WEDDING_DATE = new Date("2027-05-30T07:00:00");

const GALLERY_IMAGES = [
  { src: "/assets/images/3.jpg", caption: "Sweet Moments" },
  { src: "/assets/images/4.jpg", caption: "Forever Together" },
  { src: "/assets/images/10.jpg", caption: "Happy Memories" },
  { src: "/assets/images/1.jpg", caption: "The Groom - Rith" },
  { src: "/assets/images/2.jpg", caption: "The Bride - Ry" },
  { src: "/assets/images/5.jpg", caption: "Pure Happiness" },
  { src: "/assets/images/6.jpg", caption: "Joyful Days" },
  { src: "/assets/images/7.jpg", caption: "Romantic Walk" },
  { src: "/assets/images/8.jpg", caption: "Love Story" },
];

const INITIAL_WISHES = [
  {
    name: "សុខា & គន្ធា",
    message: "សូមជូនពរឱ្យប្អូនទាំងពីរស្រឡាញ់គ្នាដល់ចាស់កោងខ្នង រកស៊ីមានបាន ត្រជាក់ត្រជុំជានិច្ច! 💖",
    time: "2 នាទីមុន",
  },
  {
    name: "David & Jessica",
    message: "Wishing you a lifetime of endless love, joy, and blessed happiness! Congratulations Ry & Rith! 🥂✨",
    time: "10 minutes ago",
  },
  {
    name: "បងប្រុស ពិសិដ្ឋ",
    message: "សិរីសួស្តី ជ័យមង្គល វិបុលសុខ! កូនកំលោះសង្ហា កូនក្រមុំស្អាត សមគ្នាតែម្ដង! 🎉",
    time: "30 នាទីមុន",
  },
];

const ThiepKar = ({ lang = "kh" }) => {
  // Countdown State
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Lightbox State
  const [activePhoto, setActivePhoto] = useState(null);

  // Wishes State
  const [wishes, setWishes] = useState(() => {
    try {
      const saved = localStorage.getItem("wedding_wishes");
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_WISHES;
  });
  const [senderName, setSenderName] = useState("");
  const [senderMessage, setSenderMessage] = useState("");
  const [showHearts, setShowHearts] = useState(false);
  const [copiedToast, setCopiedToast] = useState(false);

  // Countdown timer calculation
  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const diff = WEDDING_DATE - now;

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Scroll reveal animation observer — re-triggers on every scroll into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          } else {
            // Remove the class when out of view so it re-animates on next scroll
            entry.target.classList.remove("is-visible");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    const elements = document.querySelectorAll(".reveal-on-scroll");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Handle wish submission
  const handleWishSubmit = (e) => {
    e.preventDefault();
    if (!senderName.trim() || !senderMessage.trim()) return;

    const newWish = {
      name: senderName.trim(),
      message: senderMessage.trim(),
      time: lang === "kh" ? "ទើបតែផ្ញើ" : "Just now",
    };

    const updated = [newWish, ...wishes];
    setWishes(updated);
    try {
      localStorage.setItem("wedding_wishes", JSON.stringify(updated));
    } catch {
      // ignore
    }

    setSenderName("");
    setSenderMessage("");
    setShowHearts(true);
    setTimeout(() => setShowHearts(false), 3000);
  };

  // Copy address to clipboard
  const handleCopyAddress = () => {
    const address =
      lang === "kh"
        ? "ភូមិកោះតូច កោះឧកញ៉ាតី សង្កាត់អរិយក្សត្រ ខេត្ត សៀមរាប"
        : "Koh Touch Village, Koh Oknha Tei Sangkat, Areykhsat City, Siem Reap";
    navigator.clipboard.writeText(address);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2500);
  };

  const isKh = lang === "kh";

  return (
    <section id="thiep-kar-section" className="thiepkar-wrapper">
      {/* Floating Rose Petals / Sparks background */}
      <div className="petals-container" aria-hidden="true">
        <span className="petal petal-1">🌸</span>
        <span className="petal petal-2">✨</span>
        <span className="petal petal-3">🌺</span>
        <span className="petal petal-4">💛</span>
        <span className="petal petal-5">🌸</span>
        <span className="petal petal-6">✨</span>
        <span className="petal petal-7">💖</span>
        <span className="petal petal-8">🌺</span>
      </div>

      {/* Heart burst on wish send */}
      {showHearts && (
        <div className="heart-burst-container" aria-hidden="true">
          <span className="heart-pop h1">💖</span>
          <span className="heart-pop h2">✨</span>
          <span className="heart-pop h3">🎉</span>
          <span className="heart-pop h4">❤️</span>
          <span className="heart-pop h5">🥰</span>
        </div>
      )}

      {/* Copy Toast */}
      {copiedToast && (
        <div className="toast-notification">
          ✓ {isKh ? "បានចម្លងអាសយដ្ឋានដោយជោគជ័យ!" : "Address copied to clipboard!"}
        </div>
      )}

      <div className="thiepkar-container">
        {/* ================= 1. TRADITIONAL THIEP KAR (INVITATION CARD) ================= */}
        <div className="thiepkar-card reveal-on-scroll">
          {/* Ornate Gold Border & Corners */}
          <div className="ornate-corner top-left" />
          <div className="ornate-corner top-right" />
          <div className="ornate-corner bottom-left" />
          <div className="ornate-corner bottom-right" />

          {/* Top Sacred Heading */}
          <div className="thiepkar-header text-center">
            <div className="traditional-crown">
              <span className="sacred-leaf">❦</span>
              <span className="sacred-circle">✦</span>
              <span className="sacred-leaf">❦</span>
            </div>
            <h3 className="thiepkar-blessing">
              {isKh
                ? "សិរីសួស្តី ជ័យមង្គល វិបុលសុខ មហាប្រសើរ"
                : "Auspicious & Blessed Matrimony"}
            </h3>
            <h1 className="thiepkar-main-title">
              {isKh ? "ធៀបការអាពាហ៍ពិពាហ៍" : "Wedding Invitation"}
            </h1>
            <p className="thiepkar-sub-blessing">
              {isKh
                ? "សិរីមង្គលអាពាហ៍ពិពាហ៍ នៃគូស្វាមីភរិយាថ្មី"
                : "The Holy Union of Two Hearts"}
            </p>
            <div className="golden-divider">
              <span className="line" />
              <span className="ring-icon">💍</span>
              <span className="line" />
            </div>
          </div>

          {/* Parents Section */}
          <div className="thiepkar-parents-grid">
            {/* Groom's Parents */}
            <div className="parent-box groom-side">
              <div className="parent-badge">
                {isKh ? "ខាងកូនប្រុស" : "Groom's Family"}
              </div>
              <h4 className="parent-label">
                {isKh ? "មាតាបិតាខាងកូនប្រុស" : "Parents of the Groom"}
              </h4>
              <p className="parent-name">
                {isKh ? "លោកឪពុក & អ្នកម្តាយ" : "Father & Mother"}
              </p>
              <p className="family-status">
                {isKh ? "សុវណ្ណ ណារិទ្ធ" : "Sovan Narith"}
              </p>
            </div>

            {/* Sacred Lotus Center */}
            <div className="parent-center-emblem">
              <span className="lotus-symbol">🪷</span>
            </div>

            {/* Bride's Parents */}
            <div className="parent-box bride-side">
              <div className="parent-badge">
                {isKh ? "ខាងកូនស្រី" : "Bride's Family"}
              </div>
              <h4 className="parent-label">
                {isKh ? "មាតាបិតាខាងកូនស្រី" : "Parents of the Bride"}
              </h4>
              <p className="parent-name">
                {isKh ? "លោកឪពុក & អ្នកម្តាយ" : "Father & Mother"}
              </p>
              <p className="family-status">
                {isKh ? "វី ចាន់រី" : "Vy Chanry"}
              </p>
            </div>
          </div>

          {/* Formal Invitation Message */}
          <div className="thiepkar-invitation-text text-center">
            <p>
              {isKh
                ? "យើងខ្ញុំមានកិត្តិយសសូមគោរពអញ្ជើញ ឯកឧត្តម លោកជំទាវ លោក លោកស្រី អ្នកនាងកញ្ញា និងប្រិយមិត្តជិតឆ្ងាយទាំងអស់ មេត្តាអញ្ជើញចូលរួមជាអធិបតី និងជាភ្ញៀវកិត្តិយស ដើម្បីប្រសិទ្ធពរជ័យ សិរីសួស្តី ជ័យមង្គល ក្នុងពិធីរៀបអាពាហ៍ពិពាហ៍កូនប្រុស កូនស្រី របស់យើងខ្ញុំ"
                : "We cordially invite you, our distinguished guests, family, and cherished friends, to grace our celebration with your presence and bestow your blessings upon the marriage of our beloved son and daughter."}
            </p>
          </div>

          {/* Bride & Groom Couple Presentation Cards */}
          <div className="couple-cards-container">
            {/* Groom Card */}
            <div className="couple-person-card groom-card">
              <div className="couple-photo-wrapper">
                <img
                  src="/assets/images/1.jpg"
                  alt="Groom Sovan Narith"
                  className="couple-photo"
                />
                <span className="couple-role-badge">
                  {isKh ? "កូនកំលោះ" : "Groom"}
                </span>
              </div>
              <h2 className="couple-person-name">
                {isKh ? "សុវណ្ណ ណារិទ្ធ" : "Sovan Narith"}
              </h2>
              <span className="couple-nickname">(Rith)</span>
              <p className="couple-honor">
                {isKh ? "កូនប្រុសច្បង" : "Beloved Son"}
              </p>
            </div>

            {/* Center Heart Rings & Connected By Love */}
            <div className="couple-center-connector">
              <div className="connector-rings">
                <span className="ring-pulse">❤️</span>
              </div>
              <span className="connector-text">
                {isKh ? "ភ្ជាប់និស្ស័យ" : "Tied in Love"}
              </span>
            </div>

            {/* Bride Card */}
            <div className="couple-person-card bride-card">
              <div className="couple-photo-wrapper">
                <img
                  src="/assets/images/2.jpg"
                  alt="Bride Vy Chanry"
                  className="couple-photo"
                />
                <span className="couple-role-badge">
                  {isKh ? "កូនក្រមុំ" : "Bride"}
                </span>
              </div>
              <h2 className="couple-person-name">
                {isKh ? "វី ចាន់រី" : "Vy Chanry"}
              </h2>
              <span className="couple-nickname">(Ry)</span>
              <p className="couple-honor">
                {isKh ? "កូនស្រីច្បង" : "Beloved Daughter"}
              </p>
            </div>
          </div>

          {/* Couple Combined Memories Highlight */}
          <div className="couple-highlight-strip">
            <div className="highlight-img-box">
              <img
                src="/assets/images/3.jpg"
                alt="Ry and Rith"
                className="highlight-img"
              />
            </div>
            <div className="highlight-text-box">
              <h4>{isKh ? "ពេលវេលានៃក្តីស្រឡាញ់" : "Our Journey of Love"}</h4>
              <p>
                {isKh
                  ? "«ក្តីស្រឡាញ់ពិតមិនមែនជាការសម្លឹងមើលមុខគ្នាទេ តែជាការសម្លឹងមើលទៅមុខរួមគ្នា ក្នុងទិសដៅតែមួយ»"
                  : "“True love is not just looking at each other, but looking forward together in the exact same direction.”"}
              </p>
            </div>
          </div>
        </div>

        {/* ================= 2. WEDDING CEREMONIAL PROGRAM (SCHEDULE) ================= */}
        <div className="thiepkar-section-card reveal-on-scroll">
          <div className="section-header text-center">
            <span className="section-badge">
              {isKh ? "កាលវិភាគពិធី" : "Timeline"}
            </span>
            <h2 className="section-title">
              {isKh ? "កម្មវិធីបុណ្យអាពាហ៍ពិពាហ៍" : "Wedding Ceremonial Program"}
            </h2>
            <p className="section-subtitle">
              {isKh
                ? "ថ្ងៃអាទិត្យ ទី៣០ ខែឧសភា ឆ្នាំ២០២៧"
                : "Sunday, May 30th, 2027"}
            </p>
            <div className="small-golden-divider" />
          </div>

          <div className="timeline-container">
            {/* Timeline Item 1 */}
            <div className="timeline-item">
              <div className="timeline-time">
                <span className="time-digit">07:00</span>
                <span className="time-ampm">{isKh ? "ព្រឹក" : "AM"}</span>
              </div>
              <div className="timeline-marker">
                <span className="marker-icon">🌅</span>
              </div>
              <div className="timeline-content">
                <h4 className="timeline-title">
                  {isKh
                    ? "ពិធីជួបជុំញាតិមិត្ត និងហែកូនកំលោះ (ហែកំណត់)"
                    : "Gathering & Groom's Procession (Hae Chamnoun)"}
                </h4>
                <p className="timeline-desc">
                  {isKh
                    ? "ជួបជុំបងប្អូន ញាតិមិត្តជិតឆ្ងាយ និងរៀបចំហែកូនកំលោះចូលរោងជ័យ រៀបចំជំនូនផ្លែឈើ"
                    : "Relatives gather to escort the groom in the traditional procession to the wedding hall with fruit trays."}
                </p>
              </div>
            </div>

            {/* Timeline Item 2 */}
            <div className="timeline-item">
              <div className="timeline-time">
                <span className="time-digit">08:30</span>
                <span className="time-ampm">{isKh ? "ព្រឹក" : "AM"}</span>
              </div>
              <div className="timeline-marker">
                <span className="marker-icon">🍎</span>
              </div>
              <div className="timeline-content">
                <h4 className="timeline-title">
                  {isKh
                    ? "ពិធីរៀបរាប់ផ្លែឈើ និងពិសាអាហារពេលព្រឹក"
                    : "Fruit Offering Ceremony & Morning Feast"}
                </h4>
                <p className="timeline-desc">
                  {isKh
                    ? "ពិធីរាប់ជំនូនផ្លែឈើ និងអញ្ជើញភ្ញៀវកិត្តិយសទាំងអស់ទទួលទានអាហារពេលព្រឹកជុំគ្នា"
                    : "Ceremonial counting and offering of wedding fruits, followed by breakfast for all honored guests."}
                </p>
              </div>
            </div>

            {/* Timeline Item 3 */}
            <div className="timeline-item">
              <div className="timeline-time">
                <span className="time-digit">09:30</span>
                <span className="time-ampm">{isKh ? "ព្រឹក" : "AM"}</span>
              </div>
              <div className="timeline-marker">
                <span className="marker-icon">✂️</span>
              </div>
              <div className="timeline-content">
                <h4 className="timeline-title">
                  {isKh
                    ? "ពិធីកាត់សក់បង្កក់សិរី"
                    : "Hair Cutting & Cleansing Blessing (Kat Sok)"}
                </h4>
                <p className="timeline-desc">
                  {isKh
                    ? "ពិធីកាត់សក់សិរីសួស្តី ជម្រះឧបទ្រពចង្រៃ និងប្រសិទ្ធពរជ័យសិរីមង្គលដល់គូស្វាមីភរិយាថ្មី"
                    : "Symbolic hair cleansing and cutting ceremony to purge misfortune and bring good luck and purity."}
                </p>
              </div>
            </div>

            {/* Timeline Item 4 */}
            <div className="timeline-item">
              <div className="timeline-time">
                <span className="time-digit">11:00</span>
                <span className="time-ampm">{isKh ? "ព្រឹក" : "AM"}</span>
              </div>
              <div className="timeline-marker">
                <span className="marker-icon">💍</span>
              </div>
              <div className="timeline-content">
                <h4 className="timeline-title">
                  {isKh
                    ? "ពិធីសំពះផ្ទឹម ចងដៃ និងបាចផ្កាស្លា"
                    : "Sacred Pairing & Red Thread Blessing (Sompeas Ptem)"}
                </h4>
                <p className="timeline-desc">
                  {isKh
                    ? "ពិធីសំពះផ្ទឹម ចងអំបោះក្រហម និងបាចផ្កាស្លា ប្រសិទ្ធពរជ័យឱ្យស្រឡាញ់គ្នាដល់ចាស់កោងខ្នង"
                    : "The sacred wrist tying ceremony with red threads and shower of areca flowers for eternal marriage bond."}
                </p>
              </div>
            </div>

            {/* Timeline Item 5 */}
            <div className="timeline-item highlight">
              <div className="timeline-time">
                <span className="time-digit">05:00</span>
                <span className="time-ampm">{isKh ? "ល្ងាច" : "PM"}</span>
              </div>
              <div className="timeline-marker">
                <span className="marker-icon">🥂</span>
              </div>
              <div className="timeline-content">
                <h4 className="timeline-title">
                  {isKh
                    ? "ពិធីទទួលបដិសណ្ឋារកិច្ច និងពិសាភោជនាហារ"
                    : "Grand Reception, Dinner Banquet & Music"}
                </h4>
                <p className="timeline-desc">
                  {isKh
                    ? "ទទួលស្វាគមន៍ភ្ញៀវកិត្តិយស ពិសាភោជនាហារពេលល្ងាច រាំកម្សាន្ត និងថតរូបអនុស្សាវរីយ៍"
                    : "Welcome reception banquet, joyous dinner celebration, champagne toast, live music, and dancing."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= 3. COUNTDOWN TO THE SPECIAL DAY ================= */}
        <div className="countdown-card reveal-on-scroll">
          <h3 className="countdown-heading">
            {isKh
              ? "⏳ រាប់ថយក្រោយដល់ថ្ងៃសិរីមង្គល ៣០ ឧសភា ២០២៧"
              : "⏳ Countdown to The Big Day: May 30, 2027"}
          </h3>
          <div className="countdown-grid">
            <div className="countdown-box">
              <span className="countdown-num">{timeLeft.days}</span>
              <span className="countdown-label">{isKh ? "ថ្ងៃ" : "Days"}</span>
            </div>
            <div className="countdown-colon">:</div>
            <div className="countdown-box">
              <span className="countdown-num">
                {String(timeLeft.hours).padStart(2, "0")}
              </span>
              <span className="countdown-label">{isKh ? "ម៉ោង" : "Hours"}</span>
            </div>
            <div className="countdown-colon">:</div>
            <div className="countdown-box">
              <span className="countdown-num">
                {String(timeLeft.minutes).padStart(2, "0")}
              </span>
              <span className="countdown-label">{isKh ? "នាទី" : "Mins"}</span>
            </div>
            <div className="countdown-colon">:</div>
            <div className="countdown-box">
              <span className="countdown-num">
                {String(timeLeft.seconds).padStart(2, "0")}
              </span>
              <span className="countdown-label">{isKh ? "វិនាទី" : "Secs"}</span>
            </div>
          </div>
        </div>

        {/* ================= 4. LOCATION & DIRECTIONS ================= */}
        <div className="location-section-card reveal-on-scroll">
          <div className="section-header text-center">
            <span className="section-badge">
              {isKh ? "ទីតាំងប្រារព្ធពិធី" : "Venue Location"}
            </span>
            <h2 className="section-title">
              {isKh ? "ទីកន្លែងរៀបចំមង្គលការ" : "Wedding Reception Venue"}
            </h2>
            <div className="small-golden-divider" />
          </div>

          <div className="location-info-card">
            <div className="location-pin-icon">📍</div>
            <div className="location-details">
              <h3>
                {isKh
                  ? "គេហដ្ឋានខាងកូនក្រមុំ (រោងជ័យ)"
                  : "The Bride's Residence (Wedding Hall)"}
              </h3>
              <p className="address-text">
                {isKh
                  ? "ភូមិកោះតូច កោះឧកញ៉ាតី សង្កាត់អរិយក្សត្រ ខេត្ត សៀមរាប"
                  : "Koh Touch Village, Koh Oknha Tei Sangkat, Areykhsat City, Siem Reap"}
              </p>
            </div>
            <div className="location-actions">
              <button
                type="button"
                className="btn-location-action btn-copy"
                onClick={handleCopyAddress}
              >
                📋 {isKh ? "ចម្លងអាសយដ្ឋាន" : "Copy Address"}
              </button>
              <a
                href="https://maps.google.com/?q=Siem+Reap+Cambodia"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-location-action btn-map"
              >
                🗺️ {isKh ? "បើក Google Maps" : "Open Google Maps"}
              </a>
            </div>
          </div>
        </div>

        {/* ================= 5. MEMORY ALBUM / PHOTO GALLERY ================= */}
        <div className="gallery-section-card reveal-on-scroll">
          <div className="section-header text-center">
            <span className="section-badge">
              {isKh ? "អនុស្សាវរីយ៍ស្នេហ៍" : "Love Gallery"}
            </span>
            <h2 className="section-title">
              {isKh ? "អាល់ប៊ុមរូបថតអនុស្សាវរីយ៍" : "Our Precious Memories"}
            </h2>
            <p className="section-subtitle">
              {isKh
                ? "រូបភាពអនុស្សាវរីយ៍ដ៏មានអត្ថន័យរបស់ ណារិទ្ធ & ចាន់រី"
                : "Cherished moments and memories of Sovan Narith & Vy Chanry"}
            </p>
            <div className="small-golden-divider" />
          </div>

          <div className="photo-grid">
            {GALLERY_IMAGES.map((img, idx) => (
              <div
                key={idx}
                className="photo-grid-item reveal-on-scroll"
                onClick={() => setActivePhoto(img)}
              >
                <img
                  src={img.src}
                  alt={img.caption}
                  className="grid-thumbnail"
                  loading="lazy"
                />
                <div className="photo-overlay">
                  <span className="photo-zoom-icon">🔍</span>
                  <span className="photo-caption">{img.caption}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Lightbox Modal */}
          {activePhoto && (
            <div
              className="lightbox-backdrop"
              onClick={() => setActivePhoto(null)}
            >
              <div
                className="lightbox-content"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  className="lightbox-close"
                  onClick={() => setActivePhoto(null)}
                >
                  ✕
                </button>
                <img
                  src={activePhoto.src}
                  alt={activePhoto.caption}
                  className="lightbox-img"
                />
                <p className="lightbox-caption">{activePhoto.caption}</p>
              </div>
            </div>
          )}
        </div>

        {/* ================= 6. WEDDING GIFT / QR CODE (ចំណងដៃ) ================= */}
        <div className="gift-section-card reveal-on-scroll">
          <div className="section-header text-center">
            <span className="section-badge">
              {isKh ? "ចំណងដៃមង្គលការ" : "Wedding Gift"}
            </span>
            <h2 className="section-title">
              {isKh ? "ចំណងដៃ & ពរជ័យមង្គល" : "Send Blessings & Wedding Gift"}
            </h2>
            <p className="section-subtitle">
              {isKh
                ? "វត្តមាន និងពរជ័យរបស់លោកអ្នកគឺជាកាដូដ៏មានតម្លៃបំផុតសម្រាប់ពួកយើង"
                : "Your presence and prayers are the greatest gift of all"}
            </p>
            <div className="small-golden-divider" />
          </div>

          <div className="gift-cards-row">
            {/* QR Card */}
            <div className="gift-qr-card">
              <div className="qr-badge">ABA / BAKONG QR</div>
              <div className="qr-box">
                {/* Visual QR Code Representation */}
                <div className="qr-visual">
                  <svg
                    width="140"
                    height="140"
                    viewBox="0 0 100 100"
                    fill="#181234"
                  >
                    <rect width="100" height="100" fill="#fff" rx="8" />
                    <rect x="10" y="10" width="24" height="24" fill="#7f53ac" />
                    <rect x="14" y="14" width="16" height="16" fill="#fff" />
                    <rect x="18" y="18" width="8" height="8" fill="#7f53ac" />

                    <rect x="66" y="10" width="24" height="24" fill="#7f53ac" />
                    <rect x="70" y="14" width="16" height="16" fill="#fff" />
                    <rect x="74" y="18" width="8" height="8" fill="#7f53ac" />

                    <rect x="10" y="66" width="24" height="24" fill="#7f53ac" />
                    <rect x="14" y="70" width="16" height="16" fill="#fff" />
                    <rect x="18" y="74" width="8" height="8" fill="#7f53ac" />

                    <rect x="42" y="12" width="6" height="6" fill="#ffe873" />
                    <rect x="52" y="12" width="6" height="6" fill="#181234" />
                    <rect x="42" y="24" width="6" height="6" fill="#181234" />
                    <rect x="52" y="24" width="6" height="6" fill="#ffe873" />

                    <rect x="40" y="40" width="20" height="20" fill="#ffe873" rx="4" />
                    <text x="43" y="55" fontSize="11" fill="#181234">💖</text>

                    <rect x="12" y="44" width="6" height="6" fill="#181234" />
                    <rect x="24" y="44" width="6" height="6" fill="#7f53ac" />
                    <rect x="70" y="44" width="8" height="6" fill="#181234" />
                    <rect x="82" y="44" width="6" height="6" fill="#7f53ac" />
                    <rect x="44" y="70" width="6" height="6" fill="#7f53ac" />
                    <rect x="54" y="76" width="8" height="6" fill="#181234" />
                    <rect x="70" y="70" width="6" height="6" fill="#ffe873" />
                    <rect x="80" y="78" width="8" height="6" fill="#7f53ac" />
                  </svg>
                </div>
                <div className="qr-info">
                  <p className="account-holder">SOVAN NARITH / VY CHANRY</p>
                  <p className="account-sub">
                    {isKh ? "ចំណងដៃតាមរយៈគណនីធនាគារ" : "Digital Wedding Gift"}
                  </p>
                </div>
              </div>
              <p className="qr-thank-note">
                {isKh
                  ? "«សូមអរគុណសម្រាប់ទឹកចិត្ត និងការជូនពរដ៏កក់ក្តៅរបស់លោកអ្នក»"
                  : "“Thank you wholeheartedly for your love, support, and blessings.”"}
              </p>
            </div>

            {/* Wishes Form & Live Board */}
            <div className="wishes-board-card">
              <h3 className="wishes-title">
                ✍️ {isKh ? "ផ្ញើសារជូនពរដល់គូស្នេហ៍" : "Send Wedding Wishes"}
              </h3>
              <form onSubmit={handleWishSubmit} className="wish-form">
                <input
                  type="text"
                  placeholder={
                    isKh
                      ? "ឈ្មោះរបស់អ្នក (Your Name)..."
                      : "Your Name..."
                  }
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="wish-input"
                  required
                />
                <textarea
                  placeholder={
                    isKh
                      ? "សរសេរសារជូនពរនៅទីនេះ (Write your blessing)..."
                      : "Write your warm blessing here..."
                  }
                  value={senderMessage}
                  onChange={(e) => setSenderMessage(e.target.value)}
                  className="wish-textarea"
                  rows="3"
                  required
                />
                <button type="submit" className="wish-submit-btn">
                  💌 {isKh ? "ផ្ញើសារជូនពរ" : "Send Blessing"}
                </button>
              </form>

              {/* Recent Wishes List */}
              <div className="wishes-feed">
                <h4 className="feed-header">
                  💬 {isKh ? "សារជូនពរពីភ្ញៀវកិត្តិយស" : "Recent Guest Wishes"}
                </h4>
                <div className="feed-list">
                  {wishes.map((w, index) => (
                    <div key={index} className="wish-item">
                      <div className="wish-top">
                        <span className="wish-author">{w.name}</span>
                        <span className="wish-time">{w.time}</span>
                      </div>
                      <p className="wish-text">{w.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= 7. FOOTER THANK YOU ================= */}
        <div className="thiepkar-footer text-center reveal-on-scroll">
          <div className="footer-rings">💍 & 💍</div>
          <h2 className="footer-names">Sovan Narith &amp; Vy Chanry</h2>
          <p className="footer-kh-names">សុវណ្ណ ណារិទ្ធ &amp; វី ចាន់រី</p>
          <p className="footer-thank">
            {isKh
              ? "សូមអរគុណយ៉ាងជ្រាលជ្រៅបំផុត ចំពោះការអញ្ជើញចូលរួមរបស់លោកអ្នក!"
              : "Thank you from the bottom of our hearts for being part of our special day!"}
          </p>
          <span className="footer-date">May 30, 2027 • Siem Reap, Cambodia</span>
        </div>
      </div>
    </section>
  );
};

export default ThiepKar;
