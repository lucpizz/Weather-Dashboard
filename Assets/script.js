
var APIKey = "9945d72978a05fa730d96ce9f5309224";

$(".btnClick").click(function(event){

     
  event.preventDefault();


  var city = $(this).text();
  console.log(city);

  getCurrentTemp(city);
  getForecast(city);

});

$(".sClick").click(function(event){

     
  event.preventDefault();


  var city = $("#input-city").val();
  console.log(city);

  getCurrentTemp(city);
  getForecast(city);

});



function getCurrentTemp(city = "Hartford") {

   var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIKey}`;
  
  console.log(city);''

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);

    const currentDay = moment.unix(response.dt).format(`L`);



    const fTemp = response.main.temp;

    const humidity = response.main.humidity;

    const wind = response.wind.speed;

    //const uvIndex = response;

        $("div1").html(`<h3>${city} (${currentDay})</h3>`);
        $("div1").append(`<lu>Temperature: ${fTemp}<sup>o</sup>F</lu><lu>Humidity: ${humidity}%</lu><lu>Wind: ${wind} MPH</lu></div>`);


});
};

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

        //$("div1").append(`<div class=><h6>5-Day Forecast:</h6>`)
        $("div2").html(`<h3>5-Day Forecast</h3>`);
        for (i = 0; i < 5; i++) {
          const element = response.daily[i];
          console.log(element);

          const timeT = moment.unix(element.dt).format('L');

          const fTemp = element.temp.day;

          const humidity = element.humidity;

         const uvi = element.uvi;
         console.log(uvi);
        
        
        $("div2").append(`<tr><td>${timeT}</td><td>Temp: ${fTemp}<sup>o</sup>F</td><td>Humidity: ${humidity}%</td><td>UV Index: ${uvi}</td></tr>`);

        /*
        $("div3").html(`<lu>${timeT}</lu>`);
        $("div4").html(`<lu>${fTemp}</lu>`);
        $("div5").html(`<lu>${humidity}</lu>`);
        $("div6").html(`<lu>${uvi}</lu>`);

         
          $("div2").append(
            `<div class="card col"><h5>${timeT}</h5><lu>Temperature: ${fTemp}<sup>o</sup>F</lu><lu>Humidity: ${humidity}%</lu></div>`
          );   
        */
        }
      }
    );
});

};



$(document).ready(function () {

  getCurrentTemp();
  getForecast();

});


  
