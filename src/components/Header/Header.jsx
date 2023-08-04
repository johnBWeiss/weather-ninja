import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { globalSelector, setToggleDarkMode } from "../../../store/globalSlice";
import { setToggleDegreeType } from "../../../store/globalSlice";
import { useLocation } from "react-router-dom";
import houseIcon from "../../assets/images/house-icon.png";
import fullHeartIcon from "../../assets/images/full-heart-icon.png";
import ToggleButton from "../ToggleButton/ToggleButton";
import darkModeImage from "../../assets/images/darkMode.png";
import lightModeImage from "../../assets/images/lightMode.png";

const Header = () => {
  const { isFarenheight, isDarkMode, error } = useSelector(globalSelector);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [overlayPosition, setOverlayPosition] = useState(
    location.pathname === "/" ? 0 : "47%"
  );

  const buttonClickHandler = (value) => {
    if (value === "home") {
      setOverlayPosition(0);
      navigate("/");
    }
    if (value === "favorites") {
      setOverlayPosition("47%");
      navigate("/Favorites");
    }
  };

  const toggleDegreeTypeHandler = () => {
    dispatch(setToggleDegreeType());
  };

  useEffect(() => {
    setOverlayPosition(location.pathname === "/" ? 0 : "47%");
  }, [location.pathname]);
  return (
    <div
      className="HeaderContainer"
      style={{
        background: isDarkMode ? "#804784" : "white",
        transition: "0.6s",
        color: isDarkMode ? "white" : "black",
        boxShadow: isDarkMode ? "0 10px 25px 0 rgb(255 255 255 / 60%)" : null,
      }}
    >
      <div className="HeaderInnerContainer">
        <div className="title-and-theme-button-container">
          {" "}
          <h2 className="header-title" onClick={() => navigate("/")}>
            Weather Ninja
          </h2>
          <img
            onClick={() => {
              dispatch(setToggleDarkMode());
            }}
            className="theme-mode-img"
            src={!isDarkMode ? darkModeImage : lightModeImage}
            alt=""
          />
        </div>
        <div className="header-button-container space-around relative ">
          <div
            className="chosen-header-overlay"
            style={{ left: overlayPosition }}
          ></div>
          <div
            className="header-button flex-center"
            onClick={() => buttonClickHandler("home")}
          >
            <img
              className="header-button-img"
              src={houseIcon}
              alt="house icon"
            />
          </div>
          <div
            className="header-button flex-center"
            onClick={() => buttonClickHandler("favorites")}
          >
            <img
              className="header-button-img"
              src={fullHeartIcon}
              alt="full heart icon"
            />
          </div>
        </div>
      </div>
      <ToggleButton
        parentFunction={toggleDegreeTypeHandler}
        isFarenheight={isFarenheight}
        isDarkMode={isDarkMode}
      />
    </div>
  );
};

export default Header;
