const API_KEY = "de3682cff22d47e078950f68509e4f4d";

function onGeoSuccess(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const weather = document.querySelector("#weather span:first-child");
      weather.innerText = `${data.main.temp}℃ ${data.weather[0].main}`;
      const city = document.querySelector("#weather span:last-child");
      city.innerText = data.name;
    });
}

function onGeoErro() {
  alert("Can't find you! No weather for you.");
}
navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoErro);
