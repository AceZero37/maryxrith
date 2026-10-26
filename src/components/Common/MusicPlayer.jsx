import React, { useRef, useState, useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";
import "./MusicPlayer.css";

const MusicPlayer = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const { lang } = useLanguage();

  // Try playing or pausing when isPlaying state changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.log("Audio play postponed until user interaction:", err);
          setIsPlaying(false);
        });
      }
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  // Handle first user interaction to enable music if preferred
  useEffect(() => {
    const handleFirstClick = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
      }
    };
    window.addEventListener("click", handleFirstClick, { once: true });
    return () => window.removeEventListener("click", handleFirstClick);
  }, [hasInteracted]);

  const togglePlay = (e) => {
    e.stopPropagation();
    setIsPlaying((prev) => !prev);
  };

  const tooltipText = isPlaying
    ? lang === "kh" ? "ផ្អាកតន្ត្រី" : "Pause Music"
    : lang === "kh" ? "ចាក់តន្ត្រី" : "Play Music";

  return (
    <div className="music-player-container">
      <audio
        ref={audioRef}
        src="/assets/music/background_sound.mp3"
        loop
        preload="auto"
      />

      {/* Floating Notes when playing */}
      {isPlaying && (
        <div className="music-notes-container" aria-hidden="true">
          <span className="floating-note note-1">♪</span>
          <span className="floating-note note-2">♫</span>
          <span className="floating-note note-3">♬</span>
          <span className="floating-note note-4">♩</span>
        </div>
      )}

      {/* Music Action Button */}
      <button
        type="button"
        className={`music-toggle-btn ${isPlaying ? "playing" : "paused"}`}
        onClick={togglePlay}
        aria-label={tooltipText}
        title={tooltipText}
      >
        {/* Pulsing Aura Rings when playing */}
        {isPlaying && <div className="music-pulse-ring" />}
        {isPlaying && <div className="music-pulse-ring delay" />}

        {/* Inner Disc with Icons & Equalizer */}
        <div className="music-btn-inner">
          {isPlaying ? (
            <div className="equalizer-bars" aria-hidden="true">
              <span className="eq-bar bar-1" />
              <span className="eq-bar bar-2" />
              <span className="eq-bar bar-3" />
              <span className="eq-bar bar-4" />
            </div>
          ) : (
            <svg
              className="music-play-icon"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8 5.14v14l11-7-11-7z" />
            </svg>
          )}
        </div>
      </button>

      {/* Optional helper hint text on first load */}
      <div className="music-label-pill">
        <span className="music-disc-icon">💿</span>
        <span className="music-label-text">
          {isPlaying
            ? (lang === "kh" ? "កំពុងចាក់ចម្រៀង" : "Playing Music")
            : (lang === "kh" ? "ចាក់តន្ត្រី" : "Play Music")}
        </span>
      </div>
    </div>
  );
};

export default MusicPlayer;
