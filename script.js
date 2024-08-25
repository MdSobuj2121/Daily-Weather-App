const apiKey = '646b4d8576984c71b05110324242508'; 
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const condition = document.getElementById('condition');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const forecast = document.getElementById('forecast');
const errorMessage = document.getElementById('errorMessage');

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeatherData(city);
    } else {
        errorMessage.textContent = 'Please enter a city name!';
    }
});

async function fetchWeatherData(city) {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        displayWeatherData(data);
        errorMessage.textContent = '';
    } catch (error) {
        errorMessage.textContent = error.message;
    }
}

function displayWeatherData(data) {
    cityName.textContent = data.location.name;
    temperature.textContent = `${data.current.temp_c}°C`;
    condition.textContent = `${data.current.condition.text}`;
    humidity.textContent = `${data.current.humidity}%`;
    wind.textContent = `${data.current.wind_kph} km/h`;

    forecast.innerHTML = '<h3>3-Day Forecast:</h3>';
    data.forecast.forecastday.forEach(day => {
        const date = new Date(day.date).toDateString();
        const forecastHTML = `
            <div>
                <p>${date}</p>
                <p>${day.day.avgtemp_c}°C - ${day.day.condition.text}</p>
            </div>
        `;
        forecast.innerHTML += forecastHTML;
    });
}
