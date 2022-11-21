var cities = ["San Francisco", "New York", "Seattle", "Los Angeles", "Chicago", "Atlanta", "Denver", "Austin"]
var APIKey = "70429634b50803ceb668f8540e918650";
var city;
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + APIKey + "74.0060";


var savedCityArray = [];

var searchBtnEl = $(".searchBtn");
console.log(searchBtnEl);
var cityBtnEl = $(".cityBtn");
var cityBtn = document.createElement("button");

searchBtnEl.on("click", function (event) {
    var userInput = $(event.target).parent().children().eq(1).val();
    console.log(userInput);
    cityBtn.textContent = (userInput);

    cityBtnEl.append(cityBtn)
    // localStorage.setItem("city name",userInput);
    savedCityArray.push(userInput);
    console.log(savedCityArray)
    localStorage.setItem("saved", savedCityArray)
    fetch(queryURL)
    // var savedBtn = JSON.parse(localStorage.getItem("userInput"));
    // savedBtn.push(userInput);
    localStorage.setItem("cities", JSON.stringify(savedCityArray))
});



function getSelectedCities() {
    var selectedCities = JSON.parse(localStorage.getItem("cities"));
    console.log(selectedCities);
    for (let i = 0; i < selectedCities.length; i++) {
        var savedBtnEl = document.createElement("button")
        savedBtnEl.textContent = selectedCities[i]
        cityBtnEl.append(savedBtnEl)
        console.log(savedBtnEl);
}
}



cityBtnEl.on("click", function(event) {
    console.log("hello");
    var cityBtnValue = $(event.target).parent().children().eq().textContent
    console.log(cityBtnValue);
});

getSelectedCities()