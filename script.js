function formatDate(date) {
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

  let currentYear = date.getFullYear();
  let currentDay = days[date.getDay()];
  let currentMonth = months[date.getMonth()];
  let currentDate = date.getDate();
  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinutes = date.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }

  let formattedDate = `${currentDay}, ${currentMonth} ${currentDate}, ${currentYear}, ${currentHour}:${currentMinutes}`;

  return formattedDate;
}

function showTemperature(response) {
    document.querySelector('#city-name').innerHTML = response.data.name;
    document.querySelector('#degree-main').innerHTML = Math.round(response.data.main.temp);
    document.querySelector('#humidity').innerHTML = response.data.main.humidity;
    document.querySelector('#wind').innerHTML = Math.round(response.data.wind.speed);
    document.querySelector('#description').innerHTML = response.data.weather[0].main;
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
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${
    position.coords.latitude
  }&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function showFarenheit(event) {
  event.preventDefault();
  degreeCelsius.innerHTML = "66";
  degreeFahrenheit.style.color = "black";
  celsius.style.color = "blue";
}

function showCelsius(event) {
  event.preventDefault();
  degreeCelsius.innerHTML = "18";
  degreeFahrenheit.style.color = "blue";
  celsius.style.color = "black";
}


// Feature #1
let now = new Date();
let currentTime = document.querySelector("#date");
currentTime.innerHTML = formatDate(now);

// Feature #2
let buttonSearch = document.querySelector("#button-search");
buttonSearch.addEventListener("click", showCity);

let currentLocationButton = document.querySelector('#current-location');
currentLocationButton.addEventListener('click', getCurrentLocation);

// Feature #3
let degreeFahrenheit = document.querySelector("#fahrenheit");
let degreeCelsius = document.querySelector("#degree-main");
let celsius = document.querySelector("#celsius");
degreeFahrenheit.addEventListener("click", showFarenheit);
celsius.addEventListener("click", showCelsius);

searchCity('Kiev');


