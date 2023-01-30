function searchCity(value) {}
function formatDate() {
  let now = new Date();
  let hours = now.getHours();

  let minutes = now.getMinutes();
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
  let day = days[now.getDay()];
  if (hours > 12) {
    let x = (hours -= 12);
    return `Last updated: ${day} ${x}:${minutes}pm`;
  }
  {
    return `Last updated: ${day} ${hours}:${minutes}am`;
  }
}
function formatDay(timestamp) {
  let now = new Date(timestamp * 1000);
  let day = now.getDay();
 let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
  
}
function displayForecast(response) {
let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
console.log(forecast);

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
    forecastHTML = forecastHTML + `
  <div class="col-2">
  <div class="weather-forecast-date">${formatDay(forecastDay.time)}</div>
  <img src="https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${forecastDay.condition.icon}.png" 
  alt=""
  width="42"/>
  <div class="weather-forecast-temperature">
    <span class="weather-forecast-temperature-max">${Math.round(forecastDay.temperature.maximum)}°</span>
    <span class="weather-forecast-temperature-min">${Math.round(forecastDay.temperature.minimum)}°</span>
  </div>
</div>
`;
}
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}


function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "f5af1dof4ba8f214e4f3d2f50b4bt770";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
 
  let temperatureElement = document.querySelector("#temperatureElement");
  let cityElement = document.querySelector("#cityElement");
  let descriptionElement = document.querySelector("#descriptionElement");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
  

  celsiusTemperature = Math.round(response.data.temperature.current);
  temperatureElement.innerHTML = Math.round(
    `${response.data.temperature.current}`
  );
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate();
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", response.data.condition.description);
  getForecast(response.data.coordinates);
}

function search(city) {
  let apiKey = "f5af1dof4ba8f214e4f3d2f50b4bt770";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperatureElement");
  //remove the active class of the celsius link
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;

  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperatureElement");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);


search("Pawtucket");
