export const fahrenheitToCelsius = (fahrenheit) => {
    const celsius = (fahrenheit - 32) * (5 / 9);
    return Math.round(celsius); // Round the Celsius value to one decimal place
};

export const celsiusToFahrenheit = (celsius) => {
    const fahrenheit = (celsius * 9) / 5 + 32;
    return Math.round(fahrenheit); // Round the Fahrenheit value to one decimal place
};

export const getDayOfWeek = (dateStr) => {
    const date = new Date(dateStr);
    const dayOfWeek = date.toLocaleDateString(undefined, { weekday: "long" });
    return dayOfWeek;
};

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
        "Sorry, error. We should blame the developer though, he probably has imposter syndrom",
    ];
    const randomIndex = Math.floor(Math.random() * errorMessages.length);
    return errorMessages[randomIndex];
};