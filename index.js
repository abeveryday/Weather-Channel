//document.body.style.backgroundColor = "gray"; might change background depending on time of day
function formatDate(timestamp) {
  //calculate the date
  let date = new Date(timestamp);
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

  return `${days[dayIndex]} ${hours}:${minutes}`;
}

function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let desctriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dayElement = document.querySelector("#day");
  temperatureElement.innerHTML = Math.round(response.data.main.temp) + "°C"; //will prob be removing °C later so user can change between °C and °F
  cityElement.innerHTML = response.data.name;
  desctriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML =
    "Humidity: " + Math.round(response.data.main.humidity) + "%";
  windElement.innerHTML = Math.round(response.data.wind.speed) + "km/h";
  dayElement.innerHTML = formatDate(response.data.dt * 1000); //have to multiply bc date info given is inaccurate without it
}

let city = "Las Vegas";
let apiKey = "740cff2b03b6ff4fa9525993b36f2fc7";
let apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
axios.get(apiUrl).then(displayTemperature);
