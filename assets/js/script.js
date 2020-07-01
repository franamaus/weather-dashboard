// greater than sign selects direct child of city-search, without- would select any #name 
var cityInput = document.querySelector("#user-input");
var cityInputEl = document.querySelector("#city-name-input");

var weatherTodayEl = document.querySelector("#search-result");
var todayTempEl = document.querySelector("#today-temperature");
var todayHumEl = document.querySelector("#today-humidity");
var todayWindEl = document.querySelector("#today-wind");
var todayUvEl = document.querySelector("#today-uv");

var fiveDayForecast = document.querySelector("#five-day-display");

// display for 5-day forecast
var displayFiveDays = function() {
    var createTemplate = function(id, date, img, temp, hum) {
        let div = document.createElement('div')
        div.classList.add("date-forecast-card");
        div.setAttribute('id', `date-${id}`)
        var template = `<h4 class="forecast-date">${date}</h4>
                        <img src="${img}"/>
                        <p>Temp: ${temp} &deg;F</p>
                        <p>Humidity: ${hum}%</p>
                        `

        div.innerHTML = template; 
        return div;
    }

    for(let i =1; i < 6; i++) {
        fiveDayForecast.appendChild(createTemplate(i, "8/16/2020", "#", "85", "45"));
    }
};

// display for current weather
var displayWeatherRepos = function(data, searchName) {
    // get today's date using moment.js
    var todayDate = moment();
    // print city name and today's date
    weatherTodayEl.textContent = searchName + " (" + todayDate.format("MM/DD/YYYY") + ")";
    // get icon for current weather condition and append to end of <h4>
    var getTodayIcon = data.weather[0].icon;
    var todayIcon = document.createElement("img");
    todayIcon.setAttribute("src", "http://openweathermap.org/img/wn/" + getTodayIcon + "@2x.png");
    weatherTodayEl.appendChild(todayIcon);
    // display for temp, hum, wind
    var getTodayTemp = data.main.temp;
    todayTempEl.textContent = getTodayTemp;
    // display for hum
    var getTodayHum = data.main.humidity;
    todayHumEl.textContent = getTodayHum;
    // display for wind
    var getTodayWind = data.wind.speed;
    todayWindEl.textContent = getTodayWind;

    var lat = data.coord.lat;
    var lon = data.coord.lon;
    var uvApiUrl = "http://api.openweathermap.org/data/2.5/uvi?appid=6d5123381b3db4fc3cae3d2e936e56de&lat=" + lat + "&lon=" +lon;
    fetch(uvApiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(uvData) {
                displayWeatherUvRepos(uvData);
            });
        } else {
            alert("Error: " + response.statusText);
        }
    });
};

// display current uv index
var displayWeatherUvRepos = function(uvIndex) {
    var getTodayUv = uvIndex.value;
    todayUvEl.textContent = getTodayUv;
    if (getTodayUv <= 3) {
        document.getElementById("today-uv").style.backgroundColor = "green";
    }
    else if (getTodayUv <= 6) {
        document.getElementById("today-uv").style.backgroundColor = "yellow";
    }
    else {
        document.getElementById("today-uv").style.backgroundColor = "red";
    }
};

// fetch repos for weather
var getWeatherRepos = function(city) {
    // creates an API endpoint
    var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&APPID=6d5123381b3db4fc3cae3d2e936e56de"
    
    // makes HTTP request for current weather conditions
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                displayWeatherRepos(data, city);
            });
        } else {
            alert("Error: " + response.statusText);
        }
      });
};

var getForecastRepos = function() {

};

var buttonSubmitHandler = function(event) {
    event.preventDefault();
    // get value from input element
    var cityName = cityInputEl.value.trim();
    
    if (cityName) {
        // go to fetch data on current weather
        getWeatherRepos(cityName);
        // go to fetch data for 5-day forecast
        // getForecastRepos(cityName);
        cityInputEl.value = "";
    } else {
      alert("Please enter a valid city name.");
    }
};

displayFiveDays(); 
cityInput.addEventListener("submit", buttonSubmitHandler);

