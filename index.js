//document.body.style.backgroundColor = "gray"; might change background depending on time of day
function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  if (hours < 10) {
    document.body.style.backgroundColor = "#fdffcd";
  } else if (hours < 20) {
    document.body.style.backgroundColor = "#ffebbb";
  } else {
    document.body.style.backgroundColor = "#a2a8d3";
  }

  return `${days[dayIndex]} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForcast(response) {
  let forcast = response.data.daily;

  let forcastElementOne = document.querySelector("#forcast-one");
  forcastElementOne.innerHTML = Math.round(forcast[1].temp.day) + "°";
  let dayOne = document.querySelector("#day-one");
  dayOne.innerHTML = formatDay(forcast[1].dt);

  let forcastElementTwo = document.querySelector("#forcast-two");
  forcastElementTwo.innerHTML = Math.round(forcast[2].temp.day) + "°";
  let dayTwo = document.querySelector("#day-two");
  dayTwo.innerHTML = formatDay(forcast[2].dt);

  let forcastElementThree = document.querySelector("#forcast-three");
  forcastElementThree.innerHTML = Math.round(forcast[3].temp.day) + "°";
  let dayThree = document.querySelector("#day-three");
  dayThree.innerHTML = formatDay(forcast[3].dt);

  let forcastElementFour = document.querySelector("#forcast-four");
  forcastElementFour.innerHTML = Math.round(forcast[4].temp.day) + "°";
  let dayFour = document.querySelector("#day-four");
  dayFour.innerHTML = formatDay(forcast[4].dt);

  let forcastElementFive = document.querySelector("#forcast-five");
  forcastElementFive.innerHTML = Math.round(forcast[5].temp.day) + "°";
  let dayFive = document.querySelector("#day-five");
  dayFive.innerHTML = formatDay(forcast[5].dt);

  let forcastElementSix = document.querySelector("#forcast-six");
  forcastElementSix.innerHTML = Math.round(forcast[6].temp.day) + "°";
  let daySix = document.querySelector("#day-six");
  daySix.innerHTML = formatDay(forcast[6].dt);

  let forcastElementSeven = document.querySelector("#forcast-seven");
  forcastElementSeven.innerHTML = Math.round(forcast[7].temp.day) + "°";
  let daySeven = document.querySelector("#day-seven");
  daySeven.innerHTML = formatDay(forcast[7].dt);
}

function getForcast(coordinates) {
  let apiKey = "740cff2b03b6ff4fa9525993b36f2fc7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=imperial&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForcast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let desctriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");

  celTemp = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celTemp); //will prob be removing °C later so user can change between °C and °F
  cityElement.innerHTML = response.data.name;
  desctriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML =
    "Humidity: " + Math.round(response.data.main.humidity) + "%";
  windElement.innerHTML = Math.round(response.data.wind.speed) + "km/h";
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForcast(response.data.coord);
}

function search(city) {
  let apiKey = "740cff2b03b6ff4fa9525993b36f2fc7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenhetLink.classList.add("active");
  let tempElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celTemp * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenhetLink.classList.remove("active");
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = Math.round(celTemp);
}

let dayElement = document.querySelector("#day");
const currentTime = new Date();
dayElement.innerHTML = formatDate(currentTime);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let celTemp = null;

let fahrenhetLink = document.querySelector("#fahrenheit-link");
fahrenhetLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Las Vegas");
