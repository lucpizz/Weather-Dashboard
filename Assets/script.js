/*
  variable for local storage array
*/

var cityStorage = [];

<<<<<<< HEAD
/*
  API key for openweather call
*/

var APIKey = "9945d72978a05fa730d96ce9f5309224";
=======
var APIKey = "";
>>>>>>> e044fec9f3aaab79bf5aff256416b404f6c364a5

/*
  The .btnClick event is to take user input and dispaly the given city weather forecast
*/

$(".btnClick").click(function (event) {
  event.preventDefault();
  var city = $(this).text();
  console.log(city);

  getCurrentTemp(city);
  getForecast(city);
});

/*
  The sClick event calls the weather forecast for the given city
*/

$(".sClick").click(function (event) {
  event.preventDefault();
  var city = $("#input-city").val();
  console.log(city);
  cityStorage.push(city);

  storeCity();
  //renderStorageCity();
  getCurrentTemp(city);
  getForecast(city);
});

/*
  The storeCity function saves the city search request in local storage
*/

function storeCity() {
  //cityStorage.push();
  //console.log("cityStorage ::: ", cityStorage);
  localStorage.setItem("city", JSON.stringify(cityStorage));
}

/*
  The renderStorageCity function takes the saved city search from local storage
  and creates a dynamic list on the webpage
*/

function renderStorageCity() {
  localStorage.getItem("city", JSON.parse(cityStorage));

  $.each(obj, function (key, value) {
    $("sidebar").append(`<li>${value}</li>`);
  });
}

/*

  The storeCity function stores the searched city in local storage


function storeCity(city) {
  cityStorage.push({
    city: "#input-city",
    description: "city name",
  });
  localStorage.setItem("city", JSON.stringify(localStorage));
}
*/

/*
    The getCurrentTemp call gets the city data and console logs the response 
*/

function getCurrentTemp(city = "Hartford") {
  var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIKey}`;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
  });
}

/*
  This function (getForecast()) uses both the open weather and opencagedata APIs to get city lat and long
  to display the current and five-day forecasts.
*/

function getForecast(city = "Hartford") {
  $.get(
    `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=APIKey`,
    (res) => {
      console.log(res);
      let results = res.results;

      var queryHartfordFive = `https://api.openweathermap.org/data/2.5/onecall?lat=${results[0].geometry.lat}2&lon=${results[0].geometry.lng}&exclude=hourly,minutely&units=imperial&appid=APIkey`;

      $.ajax({
        url: queryHartfordFive,
        method: "GET",
      }).then(function (response) {
        console.log(response);

        const dayT = moment.unix(response.daily[0].dt).format("L");
        const dayTemp = response.daily[0].temp.day;
        const dayHumidity = response.daily[0].humidity;
        const dayWind = response.daily[0].wind_speed;
        const dayUVI = response.daily[0].uvi;

        $("div1").html(`<h4>${city} (${dayT})</h4>`);
        $("div1").append(
          `<lu>Temperature: ${dayTemp}<sup>o</sup>F</lu><lu>Humidity: ${dayHumidity}%</lu><lu>Wind: ${dayWind} MPH</lu><lu>UV Index: ${dayUVI}`
        );

        $("div2").html(`<h5>5-Day Forecast</h5>`);

        for (i = 1; i < 6; i++) {
          const element = response.daily[i];
          console.log(element);

          const timeT = moment.unix(element.dt).format("L");

          const fTemp = element.temp.day;

          const humidity = element.humidity;

          const uvi = element.uvi;
          console.log(uvi);

          $("div2").append(
            `<div class="col-2">${timeT}</div><div class="col-2">Temp: ${fTemp}<sup>o</sup>F</div><div class="col-2">Humidity: ${humidity}%</div><br>`
          );
        }
      });
    }
  );
}

/*
    Document ready function to initiate the getCurrentTemp and getForecast functions
*/

$(document).ready(function () {
  getCurrentTemp();
  getForecast();
});
