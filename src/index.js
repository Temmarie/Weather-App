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
      return '../src/images/thunderstorm.jpg';
    case 'drizzle':
      return '../src/images/drizzle.jpg';
    case 'rain':
      return 'images/rain.jpg';
    case 'snow':
      return '../src/images/snow.jpg';
    case 'clear':
      return '../src/images/clear.jpg';
    case 'clouds':
      return '../src/images/clouds.jpg';
    case 'sunny':
      return '../src/images/sunny.jpg';
    default:
      return '../src/images/default.jpg';
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

const displayResults = (weather) => {
  const city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  const now = new Date();
  const date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  const tempInCel = Math.round(weather.main.temp);
  const newTemp = tempInFar(tempInCel);
  const temp = document.querySelector('.current .temp');
  temp.innerHTML = `${tempInCel}°C`;

  temp.addEventListener('click', () => {
    if (temp.innerHTML.includes('C')) {
      temp.innerHTML = `${newTemp}°F`;
    } else if (temp.innerHTML.includes('F')) {
      temp.innerHTML = `${tempInCel}°C`;
    }
  });

  const weatherEl = document.querySelector('.current .weather');
  weatherEl.innerText = weather.weather[0].main;

  const highLow = document.querySelector('.hi-low');
  highLow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;

  // Display weather image
  const weatherImage = document.getElementById('weatherImage');
  const weatherCondition = weather.weather[0].main.toLowerCase();
  console.log('Weather condition:', weatherCondition); 
  weatherImage.src = getImageUrl(weatherCondition);
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
