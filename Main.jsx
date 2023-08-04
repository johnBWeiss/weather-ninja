import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./src/pages/Home/Home";
import Header from "./src/components/Header/Header";
import Favorites from "./src/pages/Favorites/Favorites";
import lightBackground from "./src/assets/images/lightBackground.jpg";
import darkBackground from "./src/assets/images/darkBackground.jpg";
import { useSelector } from "react-redux";
import { globalSelector } from "./store/globalSlice";

const Main = () => {
  const { isDarkMode } = useSelector(globalSelector);

  return (
    <div className="app" style={{ background: isDarkMode ? "black" : "white" }}>
      <img
        className={`app-background-image background-image-darkMode-${isDarkMode}`}
        // src={""}
        alt="."
      />
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/Favorites" element={<Favorites />} />
        </Routes>
      </Router>
    </div>
  );
};

export default Main;
