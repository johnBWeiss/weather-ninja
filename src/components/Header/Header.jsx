import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { globalSelector } from "../../../store/globalSlice";
import houseIcon from "../../assets/images/house-icon.png";
import fullHeartIcon from "../../assets/images/full-heart-icon.png";

const Header = () => {
  const reduxState = useSelector(globalSelector);
  const navigate = useNavigate();
  const [overlayPosition, setOverlayPosition] = useState(0);

  const buttonClickHandler = (value) => {
    if (value === "home") {
      setOverlayPosition(0);
      navigate("/");
    }
    if (value === "favorites") {
      setOverlayPosition("47%");
    }
  };

  return (
    <div className="HeaderContainer">
      <div className="HeaderInnerContainer">
        <div>Weather Ninja</div>
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
    </div>
  );
};

export default Header;
