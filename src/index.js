const api = {
  key: '71a1d54910fc34b8989358aaf59ab093',
  base: 'https://api.openweathermap.org/data/2.5/',
};
const setQuery = (evt) => {
  if (evt.keyCode === 13) {
    getResults(searchbox.value);//eslint-disable-line
    searchbox.value = '';//eslint-disable-line
  }
};
const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);//eslint-disable-line
async function getResults(query) {
  await fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => weather.json()).then(displayResults);//eslint-disable-line
}
const displayResults = (weather) => {
  const city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;
  const now = new Date();
  const date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now); //eslint-disable-line

  const tempInCel = Math.round(weather.main.temp);
  function tempInFar(temp) {
    return Math.round((temp * (9/5)) + 32);//eslint-disable-line
  }
  const newTemp = tempInFar(tempInCel);
  const temp = document.querySelector('.current .temp');
  temp.innerHTML = `${tempInCel}<span>°C</span>`;

  temp.addEventListener('click', () => {
    if (weather.temperature.unit === 'celcius') {
      temp.innerHTML = `${newTemp}<span>°F</span>`;
    } else {
      temp.innerHTML = `${tempInCel}<span>°C</span>`;
    }
  });
  const weatherEl = document.querySelector('.current .weather');
  weatherEl.innerText = weather.weather[0].main;
  const highLow = document.querySelector('.hi-low');
  highLow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
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