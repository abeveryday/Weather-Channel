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
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = response.data.main.temp + "°C"; //will prob be removing °C later so user can change between °C and °F
}

let city = "Las Vegas";
let apiKey = "740cff2b03b6ff4fa9525993b36f2fc7";
let apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
axios.get(apiUrl).then(displayTemperature);
