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
function displayForecast () {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Fri", "Sat", "Sun"];
  days.forEach(function(day) {forecastHTML = forecastHTML + `
  <div class="col-2">
  <div class="weather-forecast-date">${day}</div>
  <img src="https://shecodes-assets.s3.amazonaws.com/api/weather/icons/clear-sky-day.png" 
  alt=""
  width="42"/>
  <div class="weather-forecast-temperature">
    <span class="weather-forecast-temperature-max">18° </span>
    <span class="weather-forecast-temperature-min">12° </span>
  </div>
</div>
`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;

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
}

function search(city) {
  
  let apiKey = "f5af1dof4ba8f214e4f3d2f50b4bt770";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
  console.log(apiUrl)
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

displayForecast();



let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Pawtucket");
