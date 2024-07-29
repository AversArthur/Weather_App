const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;
const apiKey = "0d802a1083ff29170885c747fe60c44b";
const searchBox = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const weatherImages = {
  Clear: "images/clear.png",
  Clouds: "images/clouds.png",
  Rain: "images/rain.png",
  Snow: "images/snow.png",
  Drizzle: "images/drizzle.png",
};

async function checkWeather(city) {
  const weather = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (weather.status === 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    let data = await weather.json();
    document.querySelector(".error").style.display = "none";
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "℃";

    const weatherType = data.weather[0].main;
    const weatherImage = weatherImages[weatherType];
    document.querySelector(".weather-icon").src = weatherImage;
  }
}

function runMainFunk() {
  checkWeather(searchBox.value || "Berlin");
  document.querySelector(".weather").style.display = "block";
}

searchButton.addEventListener("click", runMainFunk);
searchBox.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    runMainFunk();
  }
});
