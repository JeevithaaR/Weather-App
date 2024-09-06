document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-input");
  const cityForm = document.getElementById("city-form");
  const loading = document.querySelector(".loading");
  const error = document.querySelector(".error");
  const weather = document.querySelector(".weather");

  cityForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const cityName = searchInput.value.trim();
    if (cityName) {
      getWeather(cityName);
    }
  });

  const APIkey = "2b187135d88f47a3448d98ae42958159"; // Replace with your actual API key
  const apiUrl = (cityname) =>
    `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${APIkey}`;

  const getWeather = async (cityName) => {
    showLoading();
    hideError();
    hideWeather();
    try {
      const response = await fetch(apiUrl(cityName));
      const data = await response.json();
      if (response.ok) {
        displayWeather(data);
      } else {
        showError(data.message);
      }
    } catch (err) {
      showError("Failed to fetch data");
    } finally {
      hideLoading();
    }
  };

  const showLoading = () => {
    loading.hidden = false;
  };

  const hideLoading = () => {
    loading.hidden = true;
  };

  const showError = (message) => {
    error.querySelector("span").textContent = message;
    error.hidden = false;
  };

  const hideError = () => {
    error.hidden = true;
  };

  const showWeather = () => {
    weather.hidden = false;
  };

  const hideWeather = () => {
    weather.hidden = true;
  };

  const displayWeather = (data) => {
    const { name, main, weather: weatherData, wind } = data;
    const { temp, humidity } = main;
    const { description, icon } = weatherData[0];
    const windSpeed = wind.speed;

    document.getElementById("behavior").textContent = description;
    document.getElementById("temp").textContent = Math.round(temp);
    document.getElementById("humidity").textContent = humidity;
    document.getElementById("wind-speed").textContent = windSpeed;
    document.getElementById("city").textContent = name;
    document.getElementById(
      "weather-icon"
    ).src = `http://openweathermap.org/img/wn/${icon}@2x.png`;

    showWeather();
  };
});
