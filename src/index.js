let apiKey = `37284685d7311fe85e9989363144b159`;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?`;

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
}

function celsiusCalculation(event) {
  event.preventDefault();
  let searchCityValue = document.querySelector("#city-search");
  let city = searchCityValue.value;
  if (city) {
    axios.get(`${apiUrl}q=${city}&units=metric&appid=${apiKey}`).then(cityTemp);
  }
}

function fahrenheitCalculation(event) {
  event.preventDefault();
  let searchCityValue = document.querySelector("#city-search");
  let city = searchCityValue.value;
  if (city) {
    axios
      .get(`${apiUrl}q=${city}&units=imperial&appid=${apiKey}`)
      .then(cityTemp);
  }
}

let celsius = document.querySelector("#celsius");
let fahrenheit = document.querySelector("#fahrenheit");
let currentCity = document.querySelector("#city-default");

searchForm.addEventListener("submit", celsiusCalculation);

celsius.addEventListener("click", celsiusCalculation);
fahrenheit.addEventListener("click", fahrenheitCalculation);

//Temperature by geolocation

function handlePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  axios
    .get(
      `${apiUrl}lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
    )
    .then(cityTemp);
}

function currentCityTemp(event) {
  //handlePosition();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

currentCity.addEventListener("click", currentCityTemp);


axios.get(`${apiUrl}q=Sumy&units=metric&appid=${apiKey}`).then(cityTemp)