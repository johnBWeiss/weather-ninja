import React from "react";
import CarouselLib from "../Carousel/CarouselLib";
import CityWeekly from "../CityWeekly/CityWeekly";

const FiveDays = ({ fiveDaysArray, isFarenheight, isDarkMode }) => {
  return (
    <>
      <div className="weekly-forecast-title bold">Weekly Forecast</div>
      <div className="desktop-none ">
        <CarouselLib
          carouselItems={fiveDaysArray}
          isFarenheight={isFarenheight}
          isDarkMode={isDarkMode}
        />
      </div>
      <div className="flex flex-wrap center gallery-container mobile-none">
        {fiveDaysArray?.map((forecast) => (
          <CityWeekly
            key={forecast?.Date}
            data={forecast}
            isFarenheight={isFarenheight}
            isDarkMode={isDarkMode}
          />
        ))}
      </div>
    </>
  );
};
export default FiveDays;
