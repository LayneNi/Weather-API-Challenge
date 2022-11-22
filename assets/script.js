var APIKey = "70429634b50803ceb668f8540e918650";
var city;
var queryURL = "https://api.openweathermap.org"
var input = document.querySelector("#exampleDataList")

var savedCityArray = [];

var searchBtnEl = $(".searchBtn");
console.log(searchBtnEl);
var cityBtnEl = $(".cityBtn");
var cityBtn = document.createElement("button");
var currentWeatherEl = document.querySelector(".container-current")
var cityNameEl = $("#city-name")
var cityTempEl = $("#city-temp")
var cityDataEl = $("#city-data")




searchBtnEl.on("click", function (event) {
    if(!input.value){
        return
    }
    var search = input.value
    coordinates(search)
    input.value = ""
    cityBtn.textContent = search
    console.log(cityBtn);
    cityBtnEl.append(cityBtn)
    savedCityArray.push(search);
    console.log(savedCityArray)
    localStorage.setItem("cities", JSON.stringify(savedCityArray))
    
});

    function renderCityInfo(city, weather){
        var temp = weather.main.temp
        console.log(temp);
        console.log(city);
        var citytemp = document.createElement('p');
        citytemp.textContent = temp;
        cityTempEl.append(citytemp);


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
        console.log(city, data);
        renderCityItems(city, data)
        // call function that displays (city / data)
        // for (var i = 0; i < data.length; i++)
        var cityName = document.createElement('h3');
        var cityData = document.createElement('p');
        cityName.textContent = city;
        cityData.textContent = data;
        console.log(data);
        cityNameEl.append(cityName);
        cityDataEl.append(cityData);
    }) 

    .catch(function(error){
        console.error(error)
    })
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
    var cityBtnValue = $(event.target).parent().children(1).eq(0)
    console.log(cityBtnValue);
    // city = cityBtnValue.textContent
    // console.log(city);
    
});
