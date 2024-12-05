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