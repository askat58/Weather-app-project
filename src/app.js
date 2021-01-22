let now = new Date();

let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

let months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12"
  ];

  let currentYear = now.getFullYear();
  let currentDay = days[now.getDay()];
  let currentMonth = months[now.getMonth()];
  let currentDate = now.getDate();

  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  
  let formattedDate = `Today: ${currentDay} ${currentDate}/${currentMonth}/${currentYear}<br>${hours}:${minutes}`;

let actual = document.querySelector("#actual");
  actual.innerHTML = formattedDate;

//Change data
function displayWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#city-wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#city-humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#temp").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#description").innerHTML = response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "856531c30ebeae24c48d2152bc04716e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  searchCity(city);
  }
  
let form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);
searchCity("United Kingdom");

//Current location button
function logPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "856531c30ebeae24c48d2152bc04716e";
  let apiAdress = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(displayWeather);
}

function yourPosition() {
  navigator.geolocation.getCurrentPosition(logPosition);
}

let positionButton = document.querySelector("#current-position");
positionButton.addEventListener("click", yourPosition);


//Feature 3
let celcius = document.querySelector("#celciusTemp");
let fahrenheit = document.querySelector("#fahrenheitTemp");

function showWeatherCelcius(event) {
  event.preventDefault();
  
  let showCelcius = document.querySelector("#temp");
  showCelcius.innerHTML = 17;
}
function showWeatherFahrenheit(event) {
  event.preventDefault();
  
  let showFahrenheit = document.querySelector("#temp");
  showFahrenheit.innerHTML = Math.round(17 * 9/5 + 32);
}

celcius.addEventListener("click", showWeatherCelcius);
fahrenheit.addEventListener("click", showWeatherFahrenheit);