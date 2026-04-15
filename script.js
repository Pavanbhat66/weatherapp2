const apiKey = '8ec284407fd4106c7f6bb1ed96b8d875';

const cityInput = document.getElementById('cityInput');
const getWeatherBtn = document.getElementById('getWeatherBtn');
const weatherResult = document.getElementById('weatherResult');

function displayWeather(data) {
    const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    weatherResult.innerHTML = `
        <strong>${data.name}</strong><br>
        <img src="${iconUrl}" alt="weather icon"><br>
        Temperature: ${data.main.temp}°C<br>
        Humidity: ${data.main.humidity}%
    `;
}


function fetchWeather(city) {
    if (!city) {
        weatherResult.textContent = 'Please enter a city name.';
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(res => {
            if (!res.ok) throw new Error("City not found");
            return res.json();
        })
        .then(data => displayWeather(data))
        .catch(err => {
            weatherResult.textContent = err.message;
        });
}

getWeatherBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        weatherResult.textContent = 'Loading...';
        fetchWeather(city);
    }
});