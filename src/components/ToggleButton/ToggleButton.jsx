import React, { useState, useEffect } from "react";
// import info from "../../../assets/images/info.png";

const ToggleButton = ({ parentFunction, data }) => {
  const [activeStatus, setActiveStatus] = useState(false);
  const [showBubbleSpeech, setShowBubbleSpeech] = useState(false);

  const clickHandler = () => {
    setActiveStatus((prev) => !prev);
    parentFunction();
  };

  useEffect(() => {
    setActiveStatus(false);
  }, [data?.text]);

  return (
    <div className="gap-4 vertical-flex" style={{ marginTop: "6px" }}>
      <div
        onClick={clickHandler}
        className={`toggle-button-container active-${activeStatus}`}
      >
        <div className={`toggle-button toggle-button-${activeStatus} `}></div>
      </div>
      <div
        className="info-icon-container"
        onClick={() => {
          setShowBubbleSpeech((prev) => !prev);
        }}
      >
        {/* <img src={info} alt="info" /> */}
        {showBubbleSpeech && (
          <svg width="12" height="6" className="pointer toggle-svg">
            <polygon
              style={{ transition: "0.5s" }}
              points="6,0 0,6 12,6"
              fill="#435971"
              transform={`rotate(${180}, 6, 3)`}
            />
          </svg>
        )}
      </div>
      {showBubbleSpeech && (
        <div className="toggle-bubble-container"> {data?.text}</div>
      )}
      <div className={`toggle-font active-font-${activeStatus}`}>
        {data?.text}
      </div>
    </div>
  );
};

export default ToggleButton;
