var citySearch = $('#citySearch');
var submitBtn = $('#submitBtn');
var currentWeatherContainerEl = $('#currentWeatherContainer');
var apiKey = 'a27c4ec3fde99d757c527f6588abe9c8'

submitBtn.on("click", function (e){
    e.preventDefault();
    var searchInput = citySearch.val();
    getWeatherInfo(searchInput);
});

var getWeatherInfo = function (searchInput) {
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=imperial&q=${searchInput}&APIKEY=${apiKey}`;

    fetch (apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json()
                .then(function (data){
                    console.log(data);
                    displayCurrentWeather(data);
                    displayFutureWeather(data);
                }) 
            }
        })
};

var displayCurrentWeather = function (data) {
    currentWeatherContainerEl.html("");

    var cityName = data.name;
    var currentTemp = Math.floor(data.main.temp);
    var currentWind = Math.floor(data.wind.speed);
    var currentHumidity = data.main.humidity;

    var cityNameEl = $('<h2>');
    cityNameEl.text(cityName);
    currentWeatherContainerEl.append(cityNameEl);

    var currentTempEl = $('<div>');
    currentTempEl.text(`Temp: ${currentTemp}°F`);
    currentWeatherContainerEl.append(currentTempEl);

    var currentWindEl = $('<div>');
    currentWindEl.text(`Wind: ${currentWind} MPH`);
    currentWeatherContainerEl.append(currentWindEl);

    var currentHumidityEl = $('<div>');
    currentHumidityEl.text(`Humidity: ${currentHumidity} %`);
    currentWeatherContainerEl.append(currentHumidityEl);
}

var displayFutureWeather = function (data) {
    
}
