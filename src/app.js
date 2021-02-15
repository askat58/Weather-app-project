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
  let formattedDate = `${currentDay}<br> ${currentDate}/${currentMonth}/${currentYear}<br>${hours}:${minutes}`;

let actual = document.querySelector("#actual");
  actual.innerHTML = formattedDate;

  function formatHours(timestamp) {
    let now = new Date(timestamp);
    let hours = now.getHours();
    if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
    return `${hours}:${minutes}`;
  }

//Change  weather data
function displayWeather(response) {
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#city-wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#city-humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#temp").innerHTML = Math.round(celsiusTemperature);
  document.querySelector("#description").innerHTML = response.data.weather[0].main;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;
  
  for (let index = 0; index < 6; index++) {
   forecast = response.data.list[index]; 

   forecastElement.innerHTML += `
    <div class="col-5 px-5">
      ${formatHours(forecast.dt * 1000)}
    </div>
    <div class="col-3">
      <img  class="small-icons "src="http://openweathermap.org/img/wn/${
        forecast.weather[0].icon
      }@2x.png"/>
    </div>
    <div class="col-4">
      ${Math.round(forecast.main.temp)}℃
    </div>
  `; 
  }
}

function searchCity(city) {
  let apiKey = "856531c30ebeae24c48d2152bc04716e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#search-city");
  searchCity(cityInputElement.value);
  }
  
let form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);


//Your current location
function logPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "856531c30ebeae24c48d2152bc04716e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

function yourPosition() {
  navigator.geolocation.getCurrentPosition(logPosition);
}

let positionButton = document.querySelector("#current-position");
positionButton.addEventListener("click", yourPosition);

//Conwert to Celcius/Fahrenheit
function showWeatherFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  //remove the active class from the celsius link
  celcius.classList.remove("active");
  fahrenheit.classList.add("active");

  let fahrenheitTemperature = (celsiusTemperature * 9)/ 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let celsiusTemperature = null;


function showWeatherCelcius(event) {
  event.preventDefault();
  celcius.classList.add("active");
  fahrenheit.classList.remove("active");
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celcius = document.querySelector("#celciusTemp");
celcius.addEventListener("click", showWeatherCelcius);

let fahrenheit = document.querySelector("#fahrenheitTemp");
fahrenheit.addEventListener("click", showWeatherFahrenheit);

searchCity("London");