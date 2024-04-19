const submitButton = document.querySelector('.submit');
const searchInput = document.querySelector('.input');

submitButton.addEventListener('click', function(){
  let city = document.querySelector('.input').value;
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=3&appid=91c003f75e0552ff819bcfb19c839958`
  document.querySelector('.input').value = ' ';
  document.querySelector('.current-weather').innerHTML = ' ';
  document.querySelector('.forecast').innerHTML = ' ';
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
    console.log('FORECAST fetch success', data);
    getAndRenFive(data)
  })
};

// convert current weather
const kelvinConvert = function (data) {
  let kelvinTemp = data.main.temp
  return Math.floor((kelvinTemp - 273.15) * 9/5 + 32)
}

// select instances of weather for each day
// render 5 day forecast
// get days of the week
const getAndRenFive = function (data) {
  let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let getDate = new Date();
  let getNum = getDate.getDay();
  const getToday = function () {
    return daysOfWeek[getNum]
  };
  let dayOne = data.list[7].weather[0].main;
  let dayOneIcon = data.list[7].weather[0].icon;
  let dayOneTemp = data.list[7].main.temp;
  let dayTwo = data.list[15].weather[0].main;
  let dayTwoIcon = data.list[15].weather[0].icon;
  let dayTwoTemp = data.list[15].main.temp;
  let dayThree = data.list[23].weather[0].main;
  let dayThreeIcon = data.list[23].weather[0].icon;
  let dayThreeTemp = data.list[23].main.temp;
  let dayFour = data.list[31].weather[0].main;
  let dayFourIcon = data.list[31].weather[0].icon;
  let dayFOurTemp = data.list[31].main.temp;
  let dayFive = data.list[39].weather[0].main;
  let dayFiveIcon = data.list[39].weather[0].icon;
  let dayFiveTemp = data.list[39].main.temp;
  let weekdayOne = getToday();
  let weekdayTwo = daysOfWeek[(getNum + 1)];
  let weekdayThree = daysOfWeek[(getNum + 2)];
  let weekdayFour = daysOfWeek[(getNum + 3)];
  let weekdayFive = daysOfWeek[(getNum + 4)];
  let template = `
  <div class="container px-5 py-5"> 
    <div class="row"> 
      <div class="col mx-1">
        ${dayOne}<br>
        <img src="https://openweathermap.org/img/wn/${dayOneIcon}@2x.png"></img><br>
        ${weekdayOne}<br>
      </div> 
      <div class="col mx-1">
        ${dayTwo}<br>
        <img src="https://openweathermap.org/img/wn/${dayTwoIcon}@2x.png"></img><br>
        ${weekdayTwo}<br>
      </div> 
      <div class="col mx-1">
        ${dayThree}<br>
        <img src="https://openweathermap.org/img/wn/${dayThreeIcon}@2x.png"></img><br>
        ${weekdayThree}<br>
      </div> 
      <div class="col mx-1">
        ${dayFour}<br>
        <img src="https://openweathermap.org/img/wn/${dayFourIcon}@2x.png"></img><br>
        ${weekdayFour}<br>
      </div> 
      <div class="col mx-1">
        ${dayFive}<br>
        <img src="https://openweathermap.org/img/wn/${dayFiveIcon}@2x.png"></img><br>
        ${weekdayFive}<br>
      </div> 
    </div>
  </div> 
  `;
  document.querySelector('.forecast').insertAdjacentHTML('beforeend', template);
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

