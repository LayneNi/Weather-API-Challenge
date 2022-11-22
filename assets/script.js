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

function saveToStorage(value){
    var savedCityArray = JSON.parse(localStorage.getItem('cities')) || []
    if(savedCityArray.includes(value)){
        return
    }
    if(savedCityArray.length > 5){
            savedCityArray.shift()
        }
    savedCityArray.push(value);
    localStorage.setItem("cities", JSON.stringify(savedCityArray))
}

function renderStorage(){
    var savedCityArray = JSON.parse(localStorage.getItem('cities')) || []
    if (savedCityArray.length === 0){
        return
    }
    console.log("Rendering storage")
    for (let i = 0; i < savedCityArray.length; i++) {
        console.log(savedCityArray[i])

    }
    // console.log("For of loop")
    // for (const dogpoop of savedCityArray) {
    //     console.log("dogpoop", dogpoop)
    // }
}

searchBtnEl.on("click", function (event) {
    var input = document.querySelector("#exampleDataList")
    if(!input.value){
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

    function renderCityInfo(city, weather){
        var temp = weather.main.temp
        console.log(temp);
        console.log(city);
        // var citytemp = document.createElement('p');
        // cityTempEl.text(temp);
        cityTempEl.text("")
        cityTempEl.append("Temperature:",temp);


    }
    function renderCityItems(city, data){
        renderCityInfo(city, data.list[0], data.city.timezone)
    }


function getWeather(location) {
    var {lat} = location
    var {lon} = location
    var city = location.name
    var url = `${queryURL}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${APIKey}`
    fetch(url)
    .then(function(response) {
        return response.json()
    })
    .then(function(data){
        console.log("In the first response")
        console.log(data.list)
        document.getElementsByClassName('container-five-day')[0].innerHTML = ""
        for (let i = 4; i < data.list.length; i+=8) {
            makeFiveDayCard(data.list[i])
}
        renderCityItems(city, data)
        // call function that displays (city / data)
        // for (var i = 0; i < data.length; i++)

        // var cityName = document.createElement('h3');
        // var cityDate = document.createElement('h3');
        // var cityData = document.createElement('p');
        // var cityHumidity = document.createElement('p')
        // var cityWind = document.createElement('p')
        cityNameEl.text("")
        cityDateEl.text("")
        cityDataEl.text("")
        cityHumidityEl.text("")
        cityWindEl.text("")
        cityNameEl.text(city);
        cityHumidityEl.text("Humidity:" + " " + data.list[0].main.humidity);
        cityDataEl.text("Clouds:" + " " + data.list[0].weather[0].description);
        cityDateEl.text("Date:" + " " + data.list[0].dt_txt);
        cityWindEl.text(data.list[0].wind.speed)
        console.log(data);
        // cityNameEl.append(cityName);
        // cityDateEl.append(cityDate);
        // cityDataEl.append("Conditions:", cityData);
        // cityHumidityEl.append("Humidity:", cityHumidity);
        // cityWindEl.append("Wind Speeds:", cityWind);
    }) 

    .catch(function(error){
        console.error(error)
    })
}

function makeFiveDayCard(data){
    console.log(data)
    document.getElementsByClassName('container-five-day')[0].innerHTML += 
    `<div class="col-2 card gx-4 mx-3 p-2">
    <h5>Date: ${data.dt_txt}
    <h5>Temperature: ${data.main.temp}</h5>
    <h5>Humidity: ${data.main.humidity}</h5>
    <h5>Clouds: ${data.weather[0].description}</h5>
    <h5>Wind Speed: ${data.wind.speed}</h5>
    </div>
    `
}


    function coordinates(search) {
        var url = `${queryURL}/geo/1.0/direct?q=${search}&limit=5&appid=${APIKey}`
        fetch(url)
        .then(function(response){
            return response.json()
        })
        .then(function(data){
            if(!data[0]){
                alert("No cities found")
            }else{
                getWeather(data[0])
            }
        }) 
        .catch(function(error){
            console.error(error)
        })
    }

// 5 day forecast 
    // // // // // // // // // // // // // // // // // // // // // // // // //
    // function fiveDayWeather(search) {
    //     var url = `${queryURL}/data/2.5/forecast?q=${search}&limit=5&appid=${APIKey}`
    //     fetch(url)
    //     .then(function(data){
    //         if(!data[0]){
    //             alert("No cities found")
    //         }else{
    //             getWeather(data[0])
    //         }
    //     })
    //     .catch(function(error){
    //         console.error(error)
    //     })
    // }
 // // // // // // // // // // // // // // // // // // // // // // // // // // // 





cityBtnEl.on("click", function(event) {
    console.log("Good");
    var cityBtnValue = $(event.target).text()
    console.log(cityBtnValue);
    coordinates(cityBtnValue)
    
    
});

renderStorage()