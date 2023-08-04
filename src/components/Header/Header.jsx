import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { globalSelector } from "../../../store/globalSlice";
import houseIcon from "../../assets/images/house-icon.png";
import fullHeartIcon from "../../assets/images/full-heart-icon.png";
import { useLocation } from "react-router-dom";
import ToggleButton from "../ToggleButton/ToggleButton";
import { setToggleDegreeType } from "../../../store/globalSlice";
const Header = () => {
  const reduxState = useSelector(globalSelector);
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
    <div className="HeaderContainer">
      <div className="HeaderInnerContainer">
        <h2>Weather Ninja</h2>
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
      <ToggleButton parentFunction={toggleDegreeTypeHandler} />
    </div>
  );
};

export default Header;
