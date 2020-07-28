// greater than sign selects direct child of city-search, if without, it would select any #name 
var cityInput = document.querySelector("#user-input");
var cityInputEl = document.querySelector("#city-name-input");
var pastSearchsEl = document.querySelector("#saved-searches");

var weatherTodayEl = document.querySelector("#search-result");
var todayTempEl = document.querySelector("#today-temperature");
var todayHumEl = document.querySelector("#today-humidity");
var todayWindEl = document.querySelector("#today-wind");
var todayUvEl = document.querySelector("#today-uv");

var fiveDayForecast = document.querySelector("#five-day-display");

// display for 5-day forecast
var displayForecastRepos = function(dailyData) {

    var createTemplate = function(id, forecastDates, getForecastIcon, temp, hum) {
        let div = document.createElement('div')
        div.classList.add("date-forecast-card");
        div.setAttribute('id', `date-${id}`)
        var template = `<h4 class="forecast-date">${forecastDates}</h4>
                        <img src="${getForecastIcon}"/>
                        <p>Temp: ${temp} &deg;F</p>
                        <p>Humidity: ${hum}%</p>
                        `
        div.innerHTML = template; 
        return div;
    }

    for (var i = 0; i < dailyData.length; i++) {
        var forecastDates = dailyData[i].dt_txt.split(' ');
        var dateArray = forecastDates[0].split("-");
        var getForecastIcon = dailyData[i].weather[0].icon;
        var temp = dailyData[i].main.temp;
        var hum = dailyData[i].main.humidity
        

        fiveDayForecast.appendChild(createTemplate(
            i, 
            `${dateArray[1]}/${dateArray[2]}/${dateArray[0]}`, 
            `https://openweathermap.org/img/wn/${getForecastIcon}@2x.png`, 
            `${temp}`, 
            `${hum}`
        ));
    }
};

// sort through the 5-day forecast to get only 5 points out of the 40 points of data
var sortForecastRepos = function(data) {
    let i = 0;
    let j = 0;
    var filteredData = [];
    while (i < 5 && j < data.list.length) {
        tempData = data.list[j];
        if (tempData.dt_txt.includes("12:00:00")) {
            filteredData.push(tempData);
            i++;
        }
        j++;
    }
    //console.log(filteredData)
    // to be cont
    
    displayForecastRepos(filteredData)
}

// display for current weather
var displayWeatherRepos = function(data) {
    // get today's date using moment.js
    var todayDate = moment();
    console.log(todayDate);
    // print city name and today's date
    weatherTodayEl.textContent = data.name + " (" + todayDate.format("MM/DD/YYYY") + ")";
    // get icon for current weather condition and append to end of <h4>
    var getTodayIcon = data.weather[0].icon;
    var todayIcon = document.createElement("img");
    todayIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + getTodayIcon + "@2x.png");
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
    var uvApiUrl = "https://api.openweathermap.org/data/2.5/uvi?appid=6d5123381b3db4fc3cae3d2e936e56de&lat=" + lat + "&lon=" +lon;
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
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&APPID=6d5123381b3db4fc3cae3d2e936e56de"
    
    // makes HTTP request for current weather conditions
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                displayWeatherRepos(data);
            });
        } else {
            alert("Error: " + response.statusText);
        }
      });
};

var getForecastRepos = function(city) {
    // creates an API endpoint
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&APPID=6d5123381b3db4fc3cae3d2e936e56de"
        
    // makes HTTP request for current weather conditions
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                sortForecastRepos(data);
            });
        } else {
            alert("Error: " + response.statusText);
        }
    });
};

var loadPastSearchButtons = function() {
    var savedArray = window.localStorage.getItem("city");
    console.log(savedArray);
    for(let i = 0; i < savedArray.length; i++) {
        var city = savedArray[i];
        var savedSearchButton = `
        <button class="btn btn-outline-secondary btn-primary" type="sunmit">${city}
        </button>
        `
        var button = document.createElement("button");
        button.innerHTML = savedSearchButton;
        pastSearchsEl.appendChild(button);
    }
}

// dynamically created buttons using searches
var pastSearchButton = function() {
    // retreives saved input and creates buttons
    var savedArray = window.localStorage.getItem("city");
    console.log(savedArray);
}

// button click event that takes user input
var buttonSubmitHandler = function(event) {
    event.preventDefault();
    pastSearchButton();
    fiveDayForecast.innerHTML = "";
    // get value from input element
    var cityName = cityInputEl.value.trim();
    
    if (cityName) {
        // go to fetch data on current weather
        getWeatherRepos(cityName);
        // go to fetch data for 5-day forecast
        getForecastRepos(cityName);
        // empty out input area
        cityInputEl.value = "";
    } else {
      alert("Please enter a valid city name.");
    }

    var localStorageArr = JSON.parse(window.localStorage.getItem("city"));
    console.log(localStorageArr)
    let savedSearchArr;
    if(!localStorageArr) {
        savedSearchArr = [];
        savedSearchArr.push(cityName);
        window.localStorage.setItem("city", JSON.stringify(savedSearchArr));
    } else {
        if (localStorageArr.includes(`${cityName}`) == true ){
            savedSearchArr = localStorageArr;
            console.log("Repeats not saved!")
        } else {
            savedSearchArr = localStorageArr;
            savedSearchArr.push(cityName);
            window.localStorage.setItem("city", JSON.stringify(savedSearchArr));
        }
    }
};

cityInput.addEventListener("submit", buttonSubmitHandler);
//loadPastSearchButtons();