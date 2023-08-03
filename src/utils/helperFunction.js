export  const fahrenheitToCelsius = (fahrenheit) => {
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