const apiKey = '616d568b21e6502c2bcf3499b1b78e15';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast';

function getWeather() {
  const cityName = document.getElementById('city').value;

  if(!cityName) {
    alert('Please enter a city name');
    return;
  }
}