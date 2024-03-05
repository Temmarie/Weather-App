// Add event listener to the location button/icon
document.getElementById('locationBtn').addEventListener('click', getLocation);

// Function to fetch weather data using latitude and longitude
async function getWeatherByCoords(latitude, longitude) {
  try {
    const response = await fetch(`${api.base}weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=${api.key}`);
    const weather = await response.json();
    displayResults(weather);
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

// Function to get user's location
function getLocation() {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      // Success callback
      (position) => {
        const { latitude } = position.coords;
        const { longitude } = position.coords;
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



// Function to fetch weather data for the nearest place
async function getWeatherByNearestPlace(latitude, longitude) {
  try {
    // You can use third-party APIs or services for reverse geocoding
    // to get the name of the nearest place based on latitude and longitude
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
