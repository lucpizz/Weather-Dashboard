var cityStorage = [];

var APIKey = "9945d72978a05fa730d96ce9f5309224";

$(".btnClick").click(function (event) {
  event.preventDefault();
  var city = $(this).text();
  console.log(city);

  getCurrentTemp(city);
  getForecast(city);
});

$(".sClick").click(function (event) {
  event.preventDefault();
  var city = $("#input-city").val();
  console.log(city);
  cityStorage.push(city);

  storeCity();
  renderStorageCity();
  getCurrentTemp(city);
  getForecast(city);
});

function storeCity() {
  //cityStorage.push();
  //console.log("cityStorage ::: ", cityStorage);
  localStorage.setItem("city", JSON.stringify(cityStorage));
}

function renderStorageCity(city) {
  localStorage.getItem("city", JSON.parse(cityStorage));

  $.each(obj, function (key, value) {
    $("sidebar").append(`<li>${value}</li>`);
  });
}

//function init() {
// renderStorageCity();
//}

function storeCity(city) {
  cityStorage.push({
    city: "#input-city",
    description: "city name",
  });
  localStorage.setItem("city", JSON.stringify(localStorage));
}

function getCurrentTemp(city = "Hartford") {
  var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIKey}`;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
  });
}

function getForecast(city = "Hartford") {
  $.get(
    `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=0541b5451eff403a8510f759f1e9892d`,
    (res) => {
      console.log(res);
      let results = res.results;

      var queryHartfordFive = `https://api.openweathermap.org/data/2.5/onecall?lat=${results[0].geometry.lat}2&lon=${results[0].geometry.lng}&exclude=hourly,minutely&units=imperial&appid=9945d72978a05fa730d96ce9f5309224&`;

      // Get API Key  for OpenCage
      //0541b5451eff403a8510f759f1e9892d
      /// This is the onecall API . IT delivers

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

$(document).ready(function () {
  getCurrentTemp();
  getForecast();
});
