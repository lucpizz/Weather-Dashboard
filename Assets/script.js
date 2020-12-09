


var APIKey = "9945d72978a05fa730d96ce9f5309224";


function getCurrentTemp(city = "Hartford") {
  var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIKey}`;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);

    const fTemp = response.main.temp;

    const humidity = response.main.humidity;

    const wind = response.wind.speed;

    //const uvIndex = response;

    $("main").append(
        `<div class="card round"><h5>${city}</h5><lu>Temperature: ${fTemp}<sup>o</sup>F</lu><lu>Humidity: ${humidity}%</lu><lu>Wind: ${wind} MPH</lu>`
      );

});



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

        for (i = 0; i < 5; i++) {
          const element = response.daily[i];
          console.log(element);

          const cDate = element.dt;
          
          const timeT = moment.unix(cDate).format('L');

          const fTemp = element.temp.day;

          const humidity = element.humidity;

          const wind = element.wind_speed;
          
          $("main").append(
            `<div class="card round"><h5>${timeT}</h5><lu>Temperature: ${fTemp}<sup>o</sup>F</lu><lu>Humidity: ${humidity}%</lu><lu>Wind: ${wind} MPH</lu>`
          );   
        }
      }
    );
});



//getCurrentTemp();
//getForecast();


$(document).ready(function () {
    getCurrenTemp(city);
    getForecast();
  });