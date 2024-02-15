//API configuration
const api = {
  key: '71a1d54910fc34b8989358aaf59ab093',
  base: 'https://api.openweathermap.org/data/2.5/',
};
// Event listener for the search box
const searchbox = document.querySelector('.search-box');
const setQuery = (evt) => {
  if (evt.keyCode === 13) {
    // eslint-disable-next-line no-use-before-define
    getResults(searchbox.value);
    searchbox.value = '';
  }
};
searchbox.addEventListener('keypress', setQuery);//eslint-disable-line

// Function to Fetch Weather Data
async function getResults(query) {
  await fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => weather.json()).then(displayResults);//eslint-disable-line
}
//Function to Display Weather Data:
const displayResults = (weather) => {
  // Displaying city name and country code
  const city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  // Displaying current date
  const now = new Date();
  const date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  // Displaying temperature
  const tempInCel = Math.round(weather.main.temp);
  // Function to convert temperature to Fahrenheit
  function tempInFar(temp) {
    return Math.round((temp * (9 / 5)) + 32);
  }
  const newTemp = tempInFar(tempInCel);
  const temp = document.querySelector('.current .temp');
  temp.innerHTML = `${tempInCel}°C`;
  // Event listener to toggle temperature unit
  temp.addEventListener('click', () => {
    if (temp.innerHTML.includes('C')) {
      temp.innerHTML = `${newTemp}°F`;
    } else if (temp.innerHTML.includes('F')) {
      temp.innerHTML = `${tempInCel}°C`;
    }
  });

  // Displaying weather description
  const weatherEl = document.querySelector('.current .weather');
  weatherEl.innerText = weather.weather[0].main;

  // Displaying high and low temperatures
  const highLow = document.querySelector('.hi-low');
  highLow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
};

//Function to Build Date String:
const dateBuilder = (d) => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const day = days[d.getDay()];
  const date = d.getDate();
  const month = months[d.getMonth()];
  const year = d.getFullYear();
  return `${day} ${date} ${month} ${year}`;
};