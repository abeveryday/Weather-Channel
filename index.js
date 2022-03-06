/*if (cloudy) {
    //show image of clouds
} else if (partially cloudy) {
    //if condition is not true
} else if (sunny) {
    //ya know
} else if (rain) {

} else {
    // if none of those then generic pic
} */
//document.body.style.backgroundColor = "gray";
function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let desctriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  temperatureElement.innerHTML = Math.round(response.data.main.temp) + "°C"; //will prob be removing °C later so user can change between °C and °F
  cityElement.innerHTML = response.data.name;
  desctriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML =
    "Humidity: " + Math.round(response.data.main.humidity) + "%";
  windElement.innerHTML = Math.round(response.data.wind.speed) + "km/h";
}

let city = "Las Vegas";
let apiKey = "740cff2b03b6ff4fa9525993b36f2fc7";
let apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
axios.get(apiUrl).then(displayTemperature);
