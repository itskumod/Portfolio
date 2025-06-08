const API_KEY = 'e4e155b4777542924021a6d3bf9384f8'; // <- Replace this
const weatherData = document.getElementById('weatherData');
const locationForm = document.getElementById('locationForm');
const cityInput = document.getElementById('cityInput');
const geoBtn = document.getElementById('geoBtn');

locationForm.addEventListener('submit', e => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (city) {
    fetchWeatherByCity(city);
  }
});

geoBtn.addEventListener('click', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      pos => {
        const { latitude, longitude } = pos.coords;
        fetchWeatherByCoords(latitude, longitude);
      },
      err => {
        alert('Geolocation access denied or unavailable.');
      }
    );
  } else {
    alert('Geolocation not supported in your browser.');
  }
});

function fetchWeatherByCity(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
  fetchWeather(url);
}

function fetchWeatherByCoords(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  fetchWeather(url);
}

function fetchWeather(url) {
  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error('City not found');
      return response.json();
    })
    .then(data => displayWeather(data))
    .catch(err => {
      weatherData.innerHTML = `<p style="color:red;">Error: ${err.message}</p>`;
    });
}

function displayWeather(data) {
  const { name, sys, main, weather } = data;
  weatherData.innerHTML = `
    <h2>${name}, ${sys.country}</h2>
    <p><strong>${weather[0].main}</strong> - ${weather[0].description}</p>
    <p>🌡️ Temp: ${main.temp}°C</p>
    <p>💧 Humidity: ${main.humidity}%</p>
    <p>📈 Pressure: ${main.pressure} hPa</p>
  `;
}
