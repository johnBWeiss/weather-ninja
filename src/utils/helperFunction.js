import cloudy from "../assets/images/cloudy.png"
import lightRain from "../assets/images/light rain.png"
import clear from "../assets/images/clear.png"
import partlyCloudy from "../assets/images/partly cloudy.png"


export const fahrenheitToCelsius = (fahrenheit) => {
    const celsius = (fahrenheit - 32) * (5 / 9);
    return Number(celsius.toFixed(1));
};

export const celsiusToFahrenheit = (celsius) => {
    const fahrenheit = (celsius * 9) / 5 + 32;
    return Number(fahrenheit.toFixed(1));
};

export const getDayAndMonth = (dateStr) => {
    const date = new Date(dateStr);
    const options = { weekday: "long", month: "long", day: "numeric" };
    const dayAndMonth = date.toLocaleDateString(undefined, options);
    return dayAndMonth;
};

export const getRandomErrorMessage = (error) => {
    const errorMessages = [
        `Yeah...so about your request for ${error}. Not happening this time, had an error. Sorry`,
        `Oops! Something went wrong with ${error}. Maybe just wear a sweater or something`,
        `Um, is your browser ok? Cause ${error} didn't work. Check for an error somewhere`,
        `Sorry, had an error with ${error}. Let's blame the developer!`,
        `Sometimes you go through life thinking you can just prance along ${error}. Not this time, my friend. I'm afraid we had an error`,
        `you think it's my fault we had an error ${error}? It's all because of the A.I`
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
    if (isFarenheight) {
        min = celsiusToFahrenheit(stateMin);
        max = celsiusToFahrenheit(stateMax);
    }
    if (!isFarenheight) {
        min = fahrenheitToCelsius(dataMin);
        max = fahrenheitToCelsius(dataMax);
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
            return clear;
    }
}