import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import MusicPlayer from "./components/Common/MusicPlayer";
import Homepage from "./components/First_Page/Homepage";
import SecondHomepage from "./components/Second_Page/Homepage";

function App() {
  return (
    <LanguageProvider>
      <Router>
        <MusicPlayer />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/second" element={<SecondHomepage />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;
