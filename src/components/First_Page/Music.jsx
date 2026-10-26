import React, { useRef, useState, useEffect } from "react";

const Music = () => {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  // Play or pause audio based on playing state
  useEffect(() => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.play().catch((e) => {
        // Handle play promise rejection silently
        console.log("Audio play prevented:", e);
      });
    } else {
      audioRef.current.pause();
    }
  }, [playing]);

  const toggleMusic = () => {
    setPlaying((prev) => !prev);
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        left: 24,
        zIndex: 1000,
      }}
    >
      <audio
        ref={audioRef}
        src="/assets/music/background_sound.mp3" // Adjust path to your file
        loop
        preload="auto"
      />
      <button
        onClick={toggleMusic}
        aria-label={playing ? "Pause music" : "Play music"}
        style={{
          width: 56,
          height: 56,
          fontSize: 28,
          borderRadius: "50%",
          border: playing ? "2px solid #d72660" : "2px solid #647dee",
          background: playing
            ? "linear-gradient(135deg,#fae6f7,#ffe4e1)"
            : "linear-gradient(135deg,#e9e7fd,#f7fafc)",
          cursor: "pointer",
          outline: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: playing
            ? "0 0 12px 3px #d72660aa"
            : "0 0 12px 3px #647deeaa",
          transition: "all 0.3s ease",
        }}
      >
        {playing ? (
          // Pause icon
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="#d72660"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="6" y="5" width="4" height="14" />
            <rect x="14" y="5" width="4" height="14" />
          </svg>
        ) : (
          // Play icon
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="#647dee"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default Music;
