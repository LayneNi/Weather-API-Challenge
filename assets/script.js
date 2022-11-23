var APIKey = "70429634b50803ceb668f8540e918650";
var city;
var queryURL = "https://api.openweathermap.org"
var searchBtnEl = $(".searchBtn");
console.log(searchBtnEl);
var cityBtnEl = $(".cityBtn");
var cityBtn = document.createElement("button");
var currentWeatherEl = document.querySelector(".container-current")
var cityNameEl = $("#city-name")
var cityDateEl = $("#city-date")
var cityTempEl = $("#city-temp")
var cityDataEl = $("#city-data")
var cityHumidityEl = $("#city-humidity")
var cityWindEl = $("#city-wind")
// addign data to local storage
function saveToStorage(value) {
    var savedCityArray = JSON.parse(localStorage.getItem('cities')) || []
    if (savedCityArray.includes(value)) {
        return
    }
    if (savedCityArray.length > 8) {
        savedCityArray.shift()
    }
    savedCityArray.push(value);
    localStorage.setItem("cities", JSON.stringify(savedCityArray))
}
// getting local storage onto page
function renderStorage() {
    var savedCityArray = JSON.parse(localStorage.getItem('cities')) || []
    if (savedCityArray.length === 0) {
        return
    }
    console.log("Rendering storage")
    for (let i = 0; i < savedCityArray.length; i++) {
        console.log(savedCityArray[i])
        var button = $(`<button>`)
        button.text(savedCityArray[i])
        cityBtnEl.append(button)
    }
}
// search button click event
searchBtnEl.on("click", function (event) {
    var input = document.querySelector("#exampleDataList")
    if (!input.value) {
        return
    }
    var search = input.value
    saveToStorage(search)
    coordinates(search)
    input.value = ""
    cityBtn.textContent = search
    console.log(cityBtn);
    cityBtnEl.append(cityBtn)
});


// gets weather data for 5 day forecast
function getWeather(location) {
    var { lat } = location
    var { lon } = location
    var city = location.name
    var url = `${queryURL}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${APIKey}`
    fetch(url)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log("In the first response")
            console.log(data.list)
            document.getElementsByClassName('container-five-day')[0].innerHTML = ""
            for (let i = 4; i < data.list.length; i += 8) {
                makeFiveDayCard(data.list[i])
            }
            renderCityItems(city, data)



            function renderCityInfo(city, weather) {
                var temp = weather.main.temp
                console.log(temp);
                console.log(city);


            }
            function renderCityItems(city, data) {
                renderCityInfo(city, data.list[0], data.city.timezone)
            }



        })

        .catch(function (error) {
            console.error(error)
        })
}
// collects current weather data
function getCurrentWeather(location) {
    var { lat } = location
    var { lon } = location
    var city = location.name
    var url = `${queryURL}/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${APIKey}`
    fetch(url)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log("Look Here")
            console.log(data)
            makeCurrentDayCard(data)
        }) 
    }
// renders current weather data
function makeCurrentDayCard(data) {
    console.log(data)
    // document.getElementsByClassName('container-current')[0].innerHTML +=
    cityTempEl.text("")
    cityTempEl.append("Temperature:", " ", data.main.temp, " ", "Degrees Fahrenheit");
    cityNameEl.text("")
    cityDateEl.text("")
    cityDataEl.text("")
    cityHumidityEl.text("")
    cityWindEl.text("")
    cityNameEl.text(data.name);
    cityHumidityEl.text("Humidity:" + " " + data.main.humidity + "%");
    cityDataEl.text("Weather Conditions:" + " " + data.weather[0].description);
    cityWindEl.text("Wind Speed:" + " " + data.wind.speed + " " + "MPH");
    console.log(data);
}

// renders 5 day forecast data
function makeFiveDayCard(data) {
    console.log(data)
    // var fiveDayEl = $(".container-five-day")
    // var iconcode = data.weather[0].icon;
    // console.log(iconcode);
    // var iconurl = `${queryURL}//openweathermap.org/img/w/" + iconcode + ".png`
    document.getElementsByClassName('container-five-day')[0].innerHTML +=
    
        `<div class="col-2 card gx-4 mx-3 p-2">
    <h5>Date: ${data.dt_txt}
    <h5>Temperature: ${data.main.temp + " " + "Degrees"}</h5>
    <h5>Humidity: ${data.main.humidity + "%"}</h5>
    <h5>Conditions: ${data.weather[0].description}</h5>
    <h5>Wind Speed: ${data.wind.speed + " " + "MPH"}</h5>
    </div>
    `
    // fiveDayEl.append(iconurl)
 
}
// obatains coordinates
function coordinates(search) {
    var url = `${queryURL}/geo/1.0/direct?q=${search}&limit=5&appid=${APIKey}`
    fetch(url)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            if (!data[0]) {
                alert("No cities found")
            } else {
                getWeather(data[0])
                getCurrentWeather(data[0])
            }
        })
        .catch(function (error) {
            console.error(error)
        })
        
        .catch(function (error) {
            console.error(error)
        })
}
// created city buttons click event
cityBtnEl.on("click", function (event) {
    console.log("Good");
    var cityBtnValue = $(event.target).text()
    console.log(cityBtnValue);
    coordinates(cityBtnValue)
});

renderStorage()
