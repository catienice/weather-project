const submitButton = document.querySelector('.submit');
const searchInput = document.querySelector('.input');
const coordinates = [];


submitButton.addEventListener('click', function(){
  const city = document.querySelector('.input').value;

  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=3&appid=91c003f75e0552ff819bcfb19c839958`

  // fetches coordinates and adds to coordinates array
  fetch(url, {
    method: 'GET',
    dataType: 'json'
  })
    .then(res => res.json())
    .then(data => {
    coordinates.lat = data[0].lat
    coordinates.lon = data[0].lon
    console.log(coordinates.lat, coordinates.lon)
    })
})

// fetch daily weather from API
const fetchDaily = function() {
  const lat = coordinates[0]
  
  
  let url = `https://api.openweathermap.org/data/2.5/weather?lat={${lat}}&lon={${lon}}&appid={91c003f75e0552ff819bcfb19c839958}`;

  console.log(lat);

  fetch(url, {
    method: 'GET',
    dataType: 'json'
  })
  .then(data => data.json())
  .then(data => {
    console.log('fetch success', data);
  })
};


// fetch forecast from API
const fetchForecast = function(input) {
  
};

