import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./src/pages/Home/Home";
import Header from "./src/components/Header/Header";
import Favorites from "./src/pages/Favorites/Favorites";
import { useSelector } from "react-redux";
import { globalSelector } from "./store/globalSlice";
import "./src/styles/wailTind.scss";

const Main = () => {
  const { isDarkMode } = useSelector(globalSelector);
  const [fallBackIsDarkMode, setFallBackIsDarkMode] = useState(
    isDarkMode ?? false
  );

  useEffect(() => {
    setFallBackIsDarkMode(isDarkMode);
  }, [isDarkMode]);

  return (
    <div className="app">
      <div
        className={`app-background-image background-image-darkMode-false background-image-darkMode-${fallBackIsDarkMode}`}
      ></div>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/favorites" element={<Favorites />} />
        </Routes>
      </Router>
    </div>
  );
};

export default Main;
