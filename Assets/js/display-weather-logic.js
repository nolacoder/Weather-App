var citySearch = $('#citySearch');
var submitBtn = $('#submitBtn');
var currentWeatherContainerEl = $('#currentWeatherContainer');
var savedCitiesContainer = $('#savedCities');
var forecastContainer = $('#forecastContainer');
var apiKey = 'a27c4ec3fde99d757c527f6588abe9c8'

submitBtn.on("click", function (e) {
    e.preventDefault();
    var searchInput = citySearch.val();
    getWeatherInfo(searchInput);
});

var getWeatherInfo = function (searchInput) {
    var currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?units=imperial&q=${searchInput}&APIKEY=${apiKey}`;
    var forecastWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?units=imperial&q=${searchInput}&appid=${apiKey}`;

    fetch(currentWeatherUrl)
        .then(function (response) {
            if (response.ok) {
                response.json()
                    .then(function (data) {
                        console.log(data);
                        displayCurrentWeather(data);
                        setLocalStorage(searchInput);
                    })
            }
        })
    fetch(forecastWeatherUrl)
        .then(function (response) {
            if (response.ok) {
                response.json()
                    .then(function (data) {
                        console.log(data);
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
    var currentDate = moment().format("M/DD/YYYY");
    cityNameEl.text(`${cityName} (${currentDate})`);
    var iconImgEl = $('<img>')
    var iconCode = data.weather[0].icon;
    var iconurl = `http://openweathermap.org/img/w/${iconCode}.png`;
    iconImgEl.attr({
        id: "wicon",
        src: iconurl,
        alt: "weather icon"
    })
    cityNameEl.append(iconImgEl);
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
    forecastContainer.html("");

    for (i = 0; i < data.list.length; i++) {
        if (i === 4 || i === 12 || i === 20 || i === 28 || i === 36) {
            var forecastCardEl = $('<div>');
            var forecastCardBodyEl = $('<div>');

            var forecastDateEl = $('<div>');
            forecastDateEl.text(moment(data.list[i].dt_txt).format("M/DD/YYYY"));

            var futureIconDiv = $('<div>');
            var futureIconImgEl = $('<img>');
            var futureIconCode = data.list[i].weather[0].icon;
            var futureIconUrl = `http://openweathermap.org/img/w/${futureIconCode}.png`;
            futureIconImgEl.attr({
                id: "wicon",
                src: futureIconUrl,
                alt: "weather icon"
            })
            futureIconDiv.append(futureIconImgEl);

            var futureTemp = Math.floor(data.list[i].main.temp);
            var futureTempEl = $('<div>');
            futureTempEl.text(`Temp: ${futureTemp}°F`);

            var futureWind = Math.floor(data.list[i].wind.speed);
            var futureWindEl = $('<div>');
            futureWindEl.text(`Wind: ${futureWind} MPH`);

            var futureHumidity = data.list[i].main.humidity;
            var futureHumidityEl = $('<div>');
            futureHumidityEl.text(`Humidity: ${futureHumidity} %`);

            forecastCardBodyEl.append(forecastDateEl);
            forecastCardBodyEl.append(futureIconDiv);
            forecastCardBodyEl.append(futureTempEl);
            forecastCardBodyEl.append(futureWindEl);
            forecastCardBodyEl.append(futureHumidityEl);

            forecastCardEl.append(forecastCardBodyEl);
            forecastContainer.append(forecastCardEl);

            forecastCardBodyEl.attr("class","card-body");
            forecastCardEl.addClass("card w-auto m-2 bg-dark text-white")
        }
    }
}

var setLocalStorage = function (searchInput) {
    var city = {
        city: searchInput,
    }

    var savedWeather = JSON.parse(localStorage.getItem("savedCities")) || [];

    savedWeather.push(city);
    localStorage.setItem("savedCities", JSON.stringify(savedWeather));
    renderLocalStorage();
}

var renderLocalStorage = function () {
    savedCitiesContainer.html("");
    var savedWeather = JSON.parse(localStorage.getItem("savedCities")) || [];

    for (i = 0; i < savedWeather.length; i++) {
        var savedCityListItem = $('<li>');
        savedCityListItem.addClass("list-group-item list-group-item-action")
        savedCityListItem.text(savedWeather[i].city);
        savedCityListItem.attr("data-city", savedWeather[i].city);
        savedCitiesContainer.append(savedCityListItem);
    }
}

renderLocalStorage();

savedCitiesContainer.on("click", function (e) {
    city = e.target.getAttribute("data-city");
    getWeatherInfo(city);
});
