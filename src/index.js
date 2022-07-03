let apiKey = `37284685d7311fe85e9989363144b159`;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?`;
let apiOneCall = `https://api.openweathermap.org/data/2.5/onecall?`;
let apiUnit = `metric`

//Check the current date and time
let now = new Date();
let daysWeek = [
  `Sunday`,
  `Monday`,
  `Tuesday`,
  `Wednesday`,
  `Thursday`,
  `Friday`,
  `Saturday`
];

let weekDay = daysWeek[now.getDay()];
let hours = now.getHours();
let minutes = 9;
now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let currentDay = document.querySelector("#today");
currentDay.innerHTML = `${weekDay} ${hours}:${minutes}`;


//Forecast day format

function formatDay(timeStamp) {
  let date = new Date(timeStamp*1000);
  let day=daysWeek[date.getDay()];
  day = day.substring(0,3);
  return day;
}


//Display forecast

function displayForecast (response) {

  let forecast=document.querySelector("#week-weather");
  let dayForecast = response.data.daily;
  dayForecast.length = 6;
  let dataForecast="";

  dayForecast.forEach(function(day){
    dataForecast+=`<div class="col-2">
    <div class="date_day">${formatDay(day.dt)}</div>
    <div><img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" class="icon_day" /></div>
    <span class="t_day">${Math.round(day.temp.max)}°</span>
    <span class="t_night">${Math.round(day.temp.min)}°</span>
  </div>`
  });
  forecast.innerHTML=dataForecast
}


//Temperature in the city
let searchForm = document.querySelector("#searchCityForm");

function cityTemp(response) {
  console.log(response.data);

  let searchCity = document.querySelector("#searchCity");
  searchCity.innerHTML = response.data.name;

  let tempReplace = document.querySelector(`#temperature`);
  let tempApi = Math.round(response.data.main.temp);
  if (tempApi > 0) {
    tempReplace.innerHTML = `+${tempApi}`;
  } else {
    tempReplace.innerHTML = `${tempApi}`;
  }

  let feelsLike = document.querySelector(`#feels_like`);
  let feelsLikeApi = Math.round(response.data.main.feels_like);
  if (feelsLikeApi > 0) {
    feelsLike.innerHTML = `+${feelsLikeApi}`;
  } else {
    feelsLike.innerHTML = `${feelsLikeApi}`;
  }

  let humidity = document.querySelector(`#humidity`);
  humidity.innerHTML = response.data.main.humidity;

  let speedApi = document.querySelector(`#speed`);
  speedApi.innerHTML = response.data.wind.speed;

  let descriptionApi = document.querySelector(`#description`);
  descriptionApi.innerHTML = response.data.weather[0].description;

  let currentIcon = document.querySelector(`#current_icon`);
  let currentIconApi = response.data.weather[0].icon;
  currentIcon.setAttribute("src",`https://openweathermap.org/img/wn/${currentIconApi}@2x.png`);
  
  let coordinates = response.data.coord;
  axios.get(`${apiOneCall}lat=${coordinates.lat}&lon=${coordinates.lon}&units=${apiUnit}&appid=${apiKey}`).then(displayForecast);
}


function getTemp(event) {
  event.preventDefault();
  apiUnit = `metric`
  let searchCityValue = document.querySelector("#city-search");
  let city = searchCityValue.value;
  if (city) {
    axios.get(`${apiUrl}q=${city}&units=${apiUnit}&appid=${apiKey}`).then(cityTemp);
  }
}

let currentCity = document.querySelector("#city-default");

searchForm.addEventListener("submit", getTemp);

//Metric calculation
function celsiusCalculation(tempApi) {
  apiUnit = `metric`
  fahrenheit.classList.remove("active");
  celsius.classList.add("active");
  let currentCity= document.querySelector(`#searchCity`);
  axios.get(`${apiUrl}q=${currentCity.innerHTML}&units=${apiUnit}&appid=${apiKey}`).then(cityTemp);
}

function fahrenheitCalculation(tempApi) {
  apiUnit = `imperial`
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let currentCity= document.querySelector(`#searchCity`);
  axios.get(`${apiUrl}q=${currentCity.innerHTML}&units=${apiUnit}&appid=${apiKey}`).then(cityTemp);
}

let celsius = document.querySelector("#celsius");
let fahrenheit = document.querySelector("#fahrenheit");

celsius.addEventListener("click", celsiusCalculation);
fahrenheit.addEventListener("click", fahrenheitCalculation);


//Temperature by geolocation

function handlePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  axios
    .get(
      `${apiUrl}lat=${latitude}&lon=${longitude}&units=${apiUnit}&appid=${apiKey}`
    )
    .then(cityTemp);
}

function currentCityTemp(event) {
  apiUnit = `metric`
  navigator.geolocation.getCurrentPosition(handlePosition);
}

currentCity.addEventListener("click", currentCityTemp);

axios.get(`${apiUrl}q=Kyiv&units=metric&appid=${apiKey}`).then(cityTemp);
