const apiKey = '616d568b21e6502c2bcf3499b1b78e15';

async function getWeather(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );
    const data = await response.json();
    displayWeather(data);

    const hourlyResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
    );
    const hourlyData = await hourlyResponse.json();
    displayHourlyForecast(hourlyData.list.slice(0, 5));
  } catch (error) {
    console.log('Error fetching data', error);
  }
}

function displayWeather(data) {
  document.getElementById('date-time').textContent = `${new Date().toLocaleString()}`;
  const city = `${data.name}, ${data.sys.country}`;
  document.getElementById('weather-info').innerHTML = `<p>${city}</p>`;

  const weatherIcon = data.weather[0].icon;
  const description = data.weather[0].description;
  const temp = data.main.temp;
  document.getElementById("weather-icon").src = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
  document.getElementById("weather-icon").style.display = "block";
  document.getElementById("temp-div").textContent = `${temp}°C - ${description}`;

  displayAdditionalInfo(data);
}

function displayAdditionalInfo(data) {
  const humidity = data.main.humidity;
  const windSpeed = data.wind.speed;
  const pressure = data.main.pressure;

  const additionalInfoDiv = document.getElementById("additional-info");
  additionalInfoDiv.innerHTML = `
    <p>Humidity: ${humidity}%</p>
    <p>Wind Speed: ${windSpeed} m/s</p>
    <p>Pressure: ${pressure} hPa</p>
  `;
}