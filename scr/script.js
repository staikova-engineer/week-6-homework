src =
  "https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js";
integrity =
  "sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2";
crossorigin = "anonymous";

let today = new Date();

let date = today.getDate();
let hours = today.getHours();
let minutes = today.getMinutes();
minutes = minutes <= 9 ? "0" + minutes : minutes;
let month = today.getMonth();
let day = today.getDay();

let year = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

let week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = `${hours}:${minutes} ${week[day]} ${year[month]} ${date}`;

function changeWeatherSearch(response) {
  let temp = Math.round(response.data.main.temp);
  let tempElement = document.querySelector("#celsius");
  tempElement.innerHTML = `${temp}ºC`;

  let weather = response.data.weather[0].description;
  let weatherElement = document.querySelector("#weather-now");
  weatherElement.innerHTML = `${weather}`;

  let wind = Math.round(response.data.wind.speed);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `${wind} m/s`;

  let humidity = Math.round(response.data.main.humidity);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${humidity} %`;
}

function changeCity(event) {
  event.preventDefault();
  let input = document.querySelector("#another-city");
  let change = document.querySelector("#current-city");
  change.innerHTML = `${input.value}`;
  let apiKey = `f37ae7e0407a8ea1d736a1fcc1e6133a`;
  let units = `metric`;
  let city = input.value;
  let limit = 1;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}&limit=${limit}`;

  axios.get(apiUrl).then(changeWeatherSearch);
}

function changeWeatherCurrent(response) {
  let temp = Math.round(response.data.main.temp);
  let tempElement = document.querySelector("#celsius");
  tempElement.innerHTML = `${temp}ºC`;

  let weather = response.data.weather[0].description;
  let weatherElement = document.querySelector("#weather-now");
  weatherElement.innerHTML = `${weather}`;

  let wind = Math.round(response.data.wind.speed);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `${wind} m/s`;

  let humidity = Math.round(response.data.main.humidity);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${humidity} %`;
}

function changeCityName(answer) {
  let cityName = document.querySelector("#current-city");
  let cityNameElement = answer.data[0].name;
  cityName.innerHTML = `${cityNameElement}`;
}

function getData(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let apiKey = `f37ae7e0407a8ea1d736a1fcc1e6133a`;
  let units = `metric`;
  let limit = 1;

  let reverse = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=5&appid=${apiKey}`;

  axios.get(reverse).then(changeCityName);

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}&limit=${limit}`;

  axios.get(apiUrl).then(changeWeatherCurrent);
}

function findWeather() {
  navigator.geolocation.getCurrentPosition(getData);
}

let city = document.querySelector("form");
city.addEventListener("submit", changeCity);

let currentCity = document.querySelector("#button-current-city");
currentCity.addEventListener("click", findWeather);
