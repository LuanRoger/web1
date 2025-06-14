const API_KEY = "f010caf18ebe69fcf342873c615b7785";

function showWeather(data) {
  const resultSection = document.getElementById("result-section");
  const mainResultWeather = document.getElementById("current-weather-result");
  const descriptionResultWeather = document.getElementById(
    "current-weather-result-description"
  );
  const { weather } = data;
  const { main, description } = weather[0];

  mainResultWeather.textContent = main;
  descriptionResultWeather.textContent = description;

  resultSection.classList.remove("hidden");
}

async function fetchWeather(cityName) {
  const result = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=pt_br&appid=${API_KEY}`
  );

  if (!result.ok) {
    return;
  }

  const data = await result.json();
  showWeather(data);
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("weather-form");
  const cityInput = document.getElementById("city-input");
  const loadingIndicator = document.getElementById("loading-indicator");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const cityName = cityInput.value.trim();
    if (cityName) {
      loadingIndicator.classList.remove("hidden");
      fetchWeather(cityName).finally(() =>
        loadingIndicator.classList.add("hidden")
      );
    }
  });
});
