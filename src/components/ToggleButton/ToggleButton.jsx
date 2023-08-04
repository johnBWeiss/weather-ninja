import React, { useState, useEffect } from "react";

const ToggleButton = ({ parentFunction, isFarenheight, isDarkMode }) => {
  const [activeStatus, setActiveStatus] = useState(false);

  const clickHandler = () => {
    setActiveStatus((prev) => !prev);
    parentFunction();
  };

  useEffect(() => {
    setActiveStatus(false);
  }, []);

  return (
    <div
      className="gap-4 vertical-flex toggle-button-text-and-button-container"
      style={{
        marginTop: "6px",
      }}
    >
      <div
        onClick={clickHandler}
        className={`toggle-button-container active-${activeStatus}`}
        style={{ backgroundColor: isDarkMode && "white" }}
      >
        <div
          className={`toggle-button toggle-button-${activeStatus} `}
          style={{ backgroundColor: isDarkMode && "#d25fb0" }}
        ></div>
      </div>
      <div
        className={`toggle-font active-font-${activeStatus}`}
        onClick={clickHandler}
      >
        {isFarenheight ? "°F" : "°C"}
      </div>
    </div>
  );
};

export default ToggleButton;
