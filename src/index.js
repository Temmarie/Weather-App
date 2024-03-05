const api = {
  key: '71a1d54910fc34b8989358aaf59ab093',
  base: 'https://api.openweathermap.org/data/2.5/',
};
const searchbox = document.querySelector('.search-input');
const setQuery = (evt) => {
  if (evt.keyCode === 13) {
    getResults(searchbox.value);
    searchbox.value = '';
  }
};
searchbox.addEventListener('keypress', setQuery);

function getImageUrl(weatherCondition) {
  switch (weatherCondition) {
    case 'thunderstorm':
      return '../src/images/thunderstorm.png';
    case 'drizzle':
      return '../src/images/drizzle.png';
    case 'rain':
      return '../src/images/rain.png';
    case 'snow':
      return '../src/images/snow.png';
    case 'clear':
      return '../src/images/clear.png';
    case 'clouds':
      return '../src/images/clouds.png';
    case 'sunny':
      return '../src/images/sunny.png';
    case 'windy':
      return '../src/images/windy.png';
    case 'mist':
      return '../src/images/mist.png';
    case 'fog':
      return '../src/images/fog.png';
    case 'haze':
      return '../src/images/haze.png';
    default:
      return '../src/images/default.png';
  }
}

async function getResults(query) {
  try {
    const response = await fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`);
    const weather = await response.json();
    displayResults(weather);
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

// Function to format time
function formatTime(timestamp) {
  const date = new Date(timestamp * 1000); // Convert timestamp to milliseconds
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0'); // Ensure minutes are always two digits
  
  // Format time to 'hh:mm'
  return `${hours}:${minutes}`;
}

// Update the displayResults function
const displayResults = (weather) => {
  const city = document.querySelector('.location .city');
  console.log(city);
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  const now = new Date();
  const date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  const currentTime = document.querySelector('.location .time');
  console.log(currentTime);
  currentTime.innerText = timeBuilder(now, weather.timezone);

  const tempContainer = document.querySelector('.current .temp');
  const tempSpan = tempContainer.querySelector('span');

  // Initialize temperature display
  let isCelsius = true; // Track whether temperature is in Celsius or Fahrenheit
  let currentTemp = weather.main.temp; // Store the current temperature value

  // Function to toggle temperature unit
  const toggleTempUnit = () => {
    if (isCelsius) {
      // Convert to Fahrenheit
      currentTemp = tempInFar(currentTemp);
      tempSpan.textContent = '°F';
    } else {
      // Convert to Celsius
      currentTemp = weather.main.temp;
      tempSpan.textContent = '°C';
    }
    tempContainer.innerHTML = `${Math.round(currentTemp)}<span>${tempSpan.textContent}</span>`;
    isCelsius = !isCelsius; // Toggle temperature unit
  };

  // Event listeners for temperature toggle
  const celciusBtn = document.querySelector('.celcius');
  const farenheitBtn = document.querySelector('.farenheit');

  celciusBtn.addEventListener('click', toggleTempUnit);
  farenheitBtn.addEventListener('click', toggleTempUnit);

  // Set initial temperature display
  toggleTempUnit();

  const weatherEl = document.querySelector('.current .weather');
  weatherEl.innerText = weather.weather[0].main;

  // Display weather image
  const weatherImage = document.getElementById('weatherImage');
  const weatherCondition = weather.weather[0].main.toLowerCase();
  console.log('Weather condition:', weatherCondition); 
  weatherImage.src = getImageUrl(weatherCondition);

  // Display sunrise, sunset, wind, and humidity
  const sunrise = document.querySelector('.sunrise small');
  sunrise.innerHTML = `${formatTime(weather.sys.sunrise)} AM <i class="fas fa-sun"></i>`;

  const sunset = document.querySelector('.sunset small');
  sunset.innerHTML = `${formatTime(weather.sys.sunset)} PM <i class="fas fa-moon"></i>`;

  const wind = document.querySelector('.wind small');
  wind.innerHTML = `${weather.wind.speed} km/h <i class="fas fa-wind"></i>`;

  const humidity = document.querySelector('.humidity small');
  humidity.innerHTML = `${weather.main.humidity}% <i class="fas fa-droplet"></i>`;
};

// Function to format the time (e.g., "2:30 AM")
const timeBuilder = (d, timeZoneOffset) => {
  const localTime = new Date(d.getTime() + timeZoneOffset * 1000);
  const hours = localTime.getUTCHours(); // Use UTC hours
  const minutes = localTime.getUTCMinutes(); // Use UTC minutes
  const period = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12; // Convert to 12-hour format
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes; // Add leading zero for minutes < 10
  return `${formattedHours}:${formattedMinutes} ${period}`;
};


const dateBuilder = (d) => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const day = days[d.getDay()];
  const date = d.getDate();
  const month = months[d.getMonth()];
  const year = d.getFullYear();
  return `${day} ${date} ${month} ${year}`;
};

function tempInFar(temp) {
  return Math.round((temp * (9 / 5)) + 32);
}

// geolocation

getLocation();
function getLocation() {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      // Success callback
      (position) => {
        const { latitude, longitude } = position.coords; // Destructure latitude and longitude
        console.log('Latitude:', latitude);
        console.log('Longitude:', longitude);

        // Call the function to fetch weather data using latitude and longitude
        getWeatherByCoords(latitude, longitude);
      },
      // Error callback
      (error) => {
        console.error('Error getting user location:', error.message);
        // If user denies geolocation, fetch weather for the nearest place
        getWeatherByNearestPlace();
      },
    );
  } else {
    console.log('Geolocation is not supported by this browser.');
    // Handle unsupported browser case
  }
}

async function getWeatherByNearestPlace(latitude, longitude) {
  try {
    // Fetch weather data for the nearest place based on latitude and longitude
    const reverseGeocodingAPI = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${api.key}`;
    const response = await fetch(reverseGeocodingAPI);
    const data = await response.json();

    // Extract the nearest place name from the response
    const nearestPlaceName = data[0].name;

    // Now fetch weather data for the nearest place
    const weatherResponse = await fetch(`${api.base}weather?q=${nearestPlaceName}&units=metric&APPID=${api.key}`);
    const weatherData = await weatherResponse.json();

    // Display weather results for the nearest place
    displayResults(weatherData);
  } catch (error) {
    console.error('Error fetching weather data for the nearest place:', error);
  }
}
