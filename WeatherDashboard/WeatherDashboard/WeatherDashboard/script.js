
"use strict";

const API_KEY = "YOUR_API_KEY_HERE";

const form = document.getElementById("weather-form");
const cityInput = document.getElementById("city-input");
const searchButton = document.getElementById("search-button");
const statusMessage = document.getElementById("status");
const weatherResult = document.getElementById("weather-result");

const cityName = document.getElementById("city-name");
const countryName = document.getElementById("country-name");
const description = document.getElementById("weather-description");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const feelsLike = document.getElementById("feels-like");
const weatherIcon = document.getElementById("weather-icon");

function showStatus(message, type = "") {
    statusMessage.textContent = message;
    statusMessage.className = type;
}

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const city = cityInput.value.trim();

    if (!city) {
        showStatus("Please enter a city name.", "error");
        return;
    }

    if (API_KEY === "") {
    showStatus(
        "Please add your OpenWeather API key in script.js first.",
        "error"
    );
    return;
}
    searchButton.disabled = true;
    searchButton.textContent = "Loading...";
    weatherResult.hidden = true;
    showStatus("Fetching weather information...");

    try {
        const url =
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            encodeURIComponent(city) +
            "&appid=" + encodeURIComponent(API_KEY) +
            "&units=metric";

        const response = await fetch(url);

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("City not found. Check the city name.");
            }

            if (response.status === 401) {
                throw new Error(
                    "API key is invalid or not activated yet."
                );
            }

            if (response.status === 429) {
                throw new Error(
                    "Too many requests. Please try again later."
                );
            }

            throw new Error(
                "Unable to fetch weather. Please try again."
            );
        }

        const data = await response.json();

        // Read and display nested JSON data
        cityName.textContent = data.name;
        countryName.textContent =
            "Country: " + data.sys.country;

        description.textContent =
            data.weather[0].description;

        temperature.textContent =
            Math.round(data.main.temp);

        humidity.textContent = data.main.humidity;

        windSpeed.textContent = data.wind.speed;

        feelsLike.textContent =
            Math.round(data.main.feels_like);

        // Display weather icon
        weatherIcon.src =
            "https://openweathermap.org/img/wn/" +
            encodeURIComponent(data.weather[0].icon) +
            "@2x.png";

        weatherIcon.alt =
            data.weather[0].description;

        weatherIcon.hidden = false;
        weatherResult.hidden = false;

        showStatus("Weather updated successfully.", "success");

    } catch (error) {
        showStatus(
            error instanceof TypeError
                ? "Network error. Check your internet connection."
                : error.message,
            "error"
        );
    } finally {
        searchButton.disabled = false;
        searchButton.textContent = "Search";
    }
});
