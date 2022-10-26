function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let day = days[date.getDay()];
  let year = date.getFullYear();
  let month = months[date.getMonth()];
  let currentDate = date.getDate();

  return `${day}, ${month} ${currentDate}, ${year}, ${hours}:${minutes}`;
}

function displayForecast() {
  let forecast = document.querySelector("#forecast");
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue"];
  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
          <p class="week-day text-center">${day}</p>
          <p class="degree text-center">
              <span class="forecast-temperature-max">19°</span>/<span
              class="forecast-temperature-min"
              >10°</span
                >
          </p>
          <img
            src="http://openweathermap.org/img/wn/50d@2x.png"
            alt=""
            width="80"
            class="weather-emoji"
          />
      </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}

function showTemperature(response) {
  document.querySelector("#city-name").innerHTML = response.data.name;
  celsiusTemperature = Math.round(response.data.main.temp);
  degreeCelsius.innerHTML = celsiusTemperature;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#date").innerHTML = formatDate(
    response.data.dt * 1000
  );
  let iconElement = document.querySelector("#icon");

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function searchCity(city) {
  let apiKey = "7d478f69e1b2f5d563653f13f5f91d76";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function showCity(event) {
  event.preventDefault();
  let city = document.querySelector("#enterCity").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "7d478f69e1b2f5d563653f13f5f91d76";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function showFarenheit(event) {
  event.preventDefault();
  degreeCelsius.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);
  celsius.classList.remove("active");
  degreeFahrenheit.classList.add("active");
}

function showCelsius(event) {
  event.preventDefault();
  degreeCelsius.innerHTML = celsiusTemperature;
  degreeFahrenheit.classList.remove("active");
  celsius.classList.add("active");
}

let buttonSearch = document.querySelector("#button-search");
buttonSearch.addEventListener("click", showCity);

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);

let degreeFahrenheit = document.querySelector("#fahrenheit");
let degreeCelsius = document.querySelector("#degree-main");
let celsius = document.querySelector("#celsius");
let celsiusTemperature = null;
degreeFahrenheit.addEventListener("click", showFarenheit);
celsius.addEventListener("click", showCelsius);

searchCity("Kiev");
displayForecast();
