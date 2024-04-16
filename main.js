const submitButton = document.querySelector('.submit');
const searchInput = document.querySelector('.input');

submitButton.addEventListener('click', function(){
  let city = document.querySelector('.input').value;

  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=3&appid=91c003f75e0552ff819bcfb19c839958`

  document.querySelector('.input').value = ' ';
  document.querySelector('.current-weather').innerHTML = ' ';
  
  // FETCH COORDINATES
  fetch(url, {
    method: 'GET',
    dataType: 'json'
  })
    .then(res => res.json())
    .then(data => {
    fetchWeather(data);
    })
})

const fetchWeather = function(data) {
  let lat = data[0].lat
  let lon = data[0].lon
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=91c003f75e0552ff819bcfb19c839958`;

  const url2 = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=91c003f75e0552ff819bcfb19c839958`

  // FETCH DAILY
  fetch(url, {
    method: 'GET',
    dataType: 'json'
  })
  .then(res => res.json())
  .then(data => {
    console.log('DAILY fetch success', data);
    kelvinConvert(data);
    renderDailyWeather(data)
  });

  // FETCH FORECAST
  fetch(url2, {
    method: 'GET',
    dataType: 'json'
  })
  .then(res => res.json())
  .then(data => {
    console.log('FORECAST fetch success',data)
  })

};

// convert current weather
const kelvinConvert = function (data) {
  let kelvinTemp = data.main.temp
  return Math.floor((kelvinTemp - 273.15) * 9/5 + 32)
}

// render daily weather
const renderDailyWeather = function (data){
  let currTemp = kelvinConvert(data);
  let city = data.name;
  let weather = data.weather[0].main;
  let weatherIcon = data.weather[0].icon;
  let template = `
    <div class="column">
    <h3>${currTemp}°<br>
    ${city}<br>
    ${weather}
    </h3>
    </div>
    <div class="column">
    <img src="https://openweathermap.org/img/wn/${weatherIcon}@2x.png">
    </div>
  `
  document.querySelector('.current-weather').insertAdjacentHTML('beforeend', template);
}

