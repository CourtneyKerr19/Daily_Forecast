const apiKey = "616d568b21e6502c2bcf3499b1b78e15";

document.getElementById('search-button').addEventListener('click', () => {
    const city = document.getElementById('city').value.trim();
    if (!city) {
        alert('Please enter a city');
        return;
    }
    fetchWeatherData(city);
});

async function fetchWeatherData(city) {
    try {
        const weatherResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );
        const weatherData = await weatherResponse.json();

        if (weatherResponse.ok) {
            displayWeather(weatherData);
        } else {
            throw new Error(weatherData.message || 'Failed to fetch weather data.');
        }

        const forecastResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
        );
        const forecastData = await forecastResponse.json();

        if (forecastResponse.ok) {
            displayHourlyForecast(forecastData.list);
        } else {
            throw new Error(forecastData.message || 'Failed to fetch hourly forecast data.');
        }
    } catch (error) {
        console.error('Error:', error.message);
        alert(`Error: ${error.message}`);
    }
}

function displayWeather(data) {
  const tempDiv = document.getElementById('temp-div');
  const weatherInfo = document.getElementById('weather-info');
  const weatherIcon = document.getElementById('weather-icon');
  const dateTimeDiv = document.getElementById('date-time'); // Add reference

  // Clear previous content
  tempDiv.innerHTML = '';
  weatherInfo.innerHTML = '';
  dateTimeDiv.innerHTML = ''; // Clear previous time display

  const cityName = data.name;
  const temp = Math.round(data.main.temp);
  const description = data.weather[0].description;
  const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;

  // Current Time Logic
  const currentTime = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
  });

  dateTimeDiv.innerHTML = `<p>Current Time: ${currentTime}</p>`; // Display time

  tempDiv.innerHTML = `<p>${temp}°C</p>`;
  weatherInfo.innerHTML = `<p>${cityName}</p><p>${description}</p>`;
  weatherIcon.src = iconUrl;
  weatherIcon.style.display = 'block';
}

function displayHourlyForecast(hourlyData) {
    const hourlyForecastDiv = document.getElementById('hourly-forecast');
    hourlyForecastDiv.innerHTML = '';

    const next24Hours = hourlyData.slice(0, 8); // Show next 24 hours in 3-hour intervals

    next24Hours.forEach((item) => {
        const time = new Date(item.dt * 1000).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
        });
        const temp = Math.round(item.main.temp);
        const iconUrl = `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`;

        const hourlyItem = `
            <div class="hourly-item">
                <p>${time}</p>
                <img src="${iconUrl}" alt="${item.weather[0].description}">
                <p>${temp}°C</p>
            </div>
        `;
        hourlyForecastDiv.innerHTML += hourlyItem;
    });
}
