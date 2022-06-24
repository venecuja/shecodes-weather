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

  let currentIcon = document.querySelector(`#current_icon`);
  let currentIconApi = response.data.weather[0].icon;
  currentIcon.setAttribute("src",`https://openweathermap.org/img/wn/${currentIconApi}@2x.png`);
}

function getTemp(event) {
  event.preventDefault();
  let searchCityValue = document.querySelector("#city-search");
  let city = searchCityValue.value;
  if (city) {
    axios.get(`${apiUrl}q=${city}&units=metric&cnt=5&appid=${apiKey}`).then(cityTemp);
  }
}

let currentCity = document.querySelector("#city-default");

searchForm.addEventListener("submit", getTemp);

//Metric calculation
let celsius = document.querySelector("#celsius");
let fahrenheit = document.querySelector("#fahrenheit");

celsius.addEventListener("click", celsiusCalculation);
fahrenheit.addEventListener("click", fahrenheitCalculation);

function celsiusCalculation(tempApi) {
  let currentCity= document.querySelector(`#searchCity`);
  axios.get(`${apiUrl}q=${currentCity.innerHTML}&units=metric&cnt=5&appid=${apiKey}`).then(cityTemp);
}

function fahrenheitCalculation(tempApi) {
  let currentCity= document.querySelector(`#searchCity`);
  axios.get(`${apiUrl}q=${currentCity.innerHTML}&units=imperial&cnt=5&appid=${apiKey}`).then(cityTemp);
}
//Temperature by geolocation

function handlePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  axios
    .get(
      `${apiUrl}lat=${latitude}&lon=${longitude}&units=metric&cnt=5&appid=${apiKey}`
    )
    .then(cityTemp);
}

function currentCityTemp(event) {
  //handlePosition();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

currentCity.addEventListener("click", currentCityTemp);


axios.get(`${apiUrl}q=Sumy&units=metric&cnt=5&appid=${apiKey}`).then(cityTemp)