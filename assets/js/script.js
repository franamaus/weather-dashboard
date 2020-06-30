// greater than sign selects direct child of city-search, without- would select any #name 
var cityInput = document.querySelector("#user-input");
var cityInputEl = document.querySelector("#city-name-input");

var weatherCurrent = document.querySelector("#search-result");
let cityName  = weatherCurrent.querySelector("#name");
let currentDate  = weatherCurrent.querySelector("#date");
let currentIcon  = weatherCurrent.querySelector("#icon");

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

//display for current weather
var displayWeatherRepos = function(data, searchName) {
    
    weatherCurrent.textContent = searchName;
    
    console.log(data);
    console.log(searchName);
};

var getWeatherRepos = function(city) {
    // creates an API endpoint
    var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&APPID=6d5123381b3db4fc3cae3d2e936e56de"
    
    // makes HTTP request
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                // displayRepos(data.items, language);
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

