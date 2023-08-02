import React, { useState, useEffect, useRef } from "react";
import partCloud from "../../assets/images/partly cloudy.png";
import fullHeart from "../../assets/images/full-heart-icon-black.png";
import emptyHeart from "../../assets/images/empty-heart-icon.png";

const City = ({ cityName, title, cityTemperature, data, type }) => {
  const [temperature, setTemperature] = useState(data?.Temperature ?? "");
  const [singleTemperature, setSingleTemperature] = useState(
    cityTemperature ?? ""
  );

  const temperatureType = useRef("F");

  const fahrenheitToCelsiusHandler = () => {
    if (type === "weeklyItem") {
      let min, max;
      if (temperatureType.current === "C") {
        min = celsiusToFahrenheit(temperature?.Minimum?.Value);
        max = celsiusToFahrenheit(temperature?.Maximum?.Value);
      }
      if (temperatureType.current === "F") {
        min = fahrenheitToCelsius(data?.Temperature?.Minimum?.Value);
        max = fahrenheitToCelsius(data?.Temperature?.Maximum?.Value);
      }
      setTemperature({ Minimum: { Value: min }, Maximum: { Value: max } });
    }

    if (type !== "weeklyItem") {
      let temp;
      if (temperatureType.current === "C") {
        temp = celsiusToFahrenheit(singleTemperature);
      }
      if (temperatureType.current === "F") {
        temp = fahrenheitToCelsius(cityTemperature);
      }
      setSingleTemperature(temp);
    }

    temperatureType.current === "C"
      ? (temperatureType.current = "F")
      : (temperatureType.current = "C");
  };

  const fahrenheitToCelsius = (fahrenheit) => {
    const celsius = (fahrenheit - 32) * (5 / 9);
    return Math.round(celsius); // Round the Celsius value to one decimal place
  };

  const celsiusToFahrenheit = (celsius) => {
    const fahrenheit = (celsius * 9) / 5 + 32;
    return Math.round(fahrenheit); // Round the Fahrenheit value to one decimal place
  };

  const dateStr = data?.Date;
  const date = new Date(dateStr);
  const dayOfWeek = date.toLocaleDateString(undefined, { weekday: "long" });

  useEffect(() => {
    setTemperature(data?.Temperature);
  }, [data]);

  return (
    <div className="city-container vertical-flex gap-8 ">
      <div className="celsius-button" onClick={fahrenheitToCelsiusHandler}>
        {temperatureType.current === "F" ? "C" : "F"}
      </div>
      <div></div>
      {title}
      <div className="vertical-flex ">
        <div className="gap-12">
          <img className="weather-img" src={partCloud} alt="part cloud" />{" "}
          {type === "weeklyItem" && (
            <div>
              {temperature?.Minimum?.Value} - {temperature?.Maximum?.Value}
            </div>
          )}
          {type !== "weeklyItem" && <div>{singleTemperature}</div>}
        </div>
      </div>{" "}
      <div className="space-between">
        {type === "weeklyItem" && <div>{dayOfWeek}</div>}
        {type !== "weeklyItem" && <div>{cityName}</div>}
        <div> ° {temperatureType.current}</div>

        {type !== "weeklyItem" && (
          <img className="heart-icon-city" src={fullHeart} alt="heart" />
        )}
      </div>
    </div>
  );
};
export default City;
