import cloudy from "../assets/images/cloudy.png"
import lightRain from "../assets/images/light rain.png"
import clear from "../assets/images/clear.png"
import partlyCloudy from "../assets/images/partly cloudy.png"




export const fahrenheitToCelsius = (fahrenheit) => {
    const celsius = (fahrenheit - 32) * (5 / 9);
    // return Math.round(celsius); 
    return Number(celsius.toFixed(1)); // Round to one decimal point
};

export const celsiusToFahrenheit = (celsius) => {
    const fahrenheit = (celsius * 9) / 5 + 32;
    // return Math.round(fahrenheit); 
    return Number(fahrenheit.toFixed(1)); // Round to one decimal point
};

// export const getDayOfWeek = (dateStr) => {
//     const date = new Date(dateStr);
//     const dayOfWeek = date.toLocaleDateString(undefined, { weekday: "long" });
//     return dayOfWeek;
// };

export const getDayAndMonth = (dateStr) => {
    const date = new Date(dateStr);
    const options = { weekday: "long", month: "long", day: "numeric" };
    const dayAndMonth = date.toLocaleDateString(undefined, options);
    return dayAndMonth;
};

export const getRandomErrorMessage = () => {
    const errorMessages = [
        "Yeah...so about your request. Not happening this time, had an error. Sorry",
        "Oops! Something went wrong. Just wear a sweater or something",
        "Um, is your browser ok? Cause this isn't really working. Check for an error somewhere",
        "Sorry, had an error. let's blame the developer!",
    ];
    const randomIndex = Math.floor(Math.random() * errorMessages.length);
    return errorMessages[randomIndex];
};


export const isFavoriteHandler = (cityCode) => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    return favorites.some(
        (item) =>
            item.cityCode === cityCode
    );
};

export const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

export const weeklyMinMax = (isFarenheight, stateMin, stateMax, dataMin, dataMax) => {
    let min, max
    if (!isFarenheight) {
        min = celsiusToFahrenheit(stateMin);
        max = celsiusToFahrenheit(stateMax);
        // min = celsiusToFahrenheit(stateMinMaxTemperature?.Minimum?.Value);
        // max = celsiusToFahrenheit(stateMinMaxTemperature?.Maximum?.Value);
    }
    if (isFarenheight) {
        min = fahrenheitToCelsius(dataMin);
        // min = fahrenheitToCelsius(data?.Temperature?.Minimum?.Value);
        max = fahrenheitToCelsius(dataMax);
        // max = fahrenheitToCelsius(data?.Temperature?.Maximum?.Value);
    }

    return { min, max }
}

export const getImageForWeather = (weather) => {
    const lowerWeather = weather?.toLowerCase();

    switch (lowerWeather) {
        case 'cloudy':
            return cloudy;
        case 'partly cloudy':
            return partlyCloudy;
        case 'clear':
            return clear;
        case 'sunny':
            return clear;
        case 'light rain':
            return lightRain;
        case 'heavy rain':
            return lightRain;
        case 'mostly clear':
            return partlyCloudy;
        default:
            return sunny;
    }
}