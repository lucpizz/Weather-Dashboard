

var APIKey = "9945d72978a05fa730d96ce9f5309224";

var todayDate = Date();

console.log(todayDate);

$(document)




function getTempHartford() {

        var hartford = "Hartford";
        var queryHartford = `https://api.openweathermap.org/data/2.5/weather?q=${hartford}&units=imperial&appid=${APIKey}`;

    $.ajax({
    url: queryHartford,
    method: "GET",
     }).then(function (response) {
    console.log(response);

    const fTemp = response.main.temp;

    const humidity = response.main.humidity;

    const wind = response.wind.speed;

    const uvIndex = response;

    $("main").append("<h2>" + hartford + "</h2");

    $("main").append("<lu>Temperature: " + fTemp + " <sup>o</sup>F</lu>");

    $("main").append("<br><lu>Humidity: " + humidity + " %</lu>");

    $("main").append("<br><lu>Wind: " + wind + " MPH</lu>");
    });

}

function getTeamHartfordFiveDays() {


    var hartford = "Hartford";
    var queryHartfordFive = `https://api.openweathermap.org/data/2.5/forecast?q=${hartford}&units=imperial&appid=${APIKey}`;

    $.ajax({
        url: queryHartfordFive,
        method: "GET",
         }).then(function (response) {
            
            console.log(response);
            console.log("hello");
           
    
    for (i = 0; i < 5; i++) {

        console.log(i);
        console.log("hello");

        const fTemp = response.main.temp;

        const humidity = response.main.humidity;
    
        const wind = response.wind.speed;

        console.log(wind);

        $("main").append("<h2>" + hartford + "</h2");

        $("main").append("<lu>Temperature: " + fTemp + " <sup>o</sup>F</lu>");
    
        $("main").append("<br><lu>Humidity: " + humidity + " %</lu>");
    
        $("main").append("<br><lu>Wind: " + wind + " MPH</lu>");

    }

      });
    }
     




function getTempAustin() {
  var austin = "Austin";
  var queryAustin = `https://api.openweathermap.org/data/2.5/weather?q=${austin}&units=imperial&appid=${APIKey}`;

  $.ajax({
    url: queryAustin,
    method: "GET",
  }).then(function (response) {
    console.log(response);

    const fTemp = response.main.temp;

    const humidity = response.main.humidity;

    const wind = response.wind.speed;

    const uvIndex = response;

    $("main").append("<h2>" + austin + "</h2");

    $("main").append("<lu>Temperature: " + fTemp + " <sup>o</sup>F</lu>");

    $("main").append("<br><lu>Humidity: " + humidity + " %</lu>");

    $("main").append("<br><lu>Wind: " + wind + " MPH</lu>");
  });
}

function getTempChicago() {
    var chicago = "Chicago";
    var queryChicago = `https://api.openweathermap.org/data/2.5/weather?q=${chicago}&units=imperial&appid=${APIKey}`;
  
    $.ajax({
      url: queryChicago,
      method: "GET",
    }).then(function (response) {
      console.log(response);
  
      const fTemp = response.main.temp;
  
      const humidity = response.main.humidity;
  
      const wind = response.wind.speed;
  
      const uvIndex = response;
  
      $("main").append("<h2>" + austin + "</h2");
  
      $("main").append("<lu>Temperature: " + fTemp + " <sup>o</sup>F</lu>");
  
      $("main").append("<br><lu>Humidity: " + humidity + " %</lu>");
  
      $("main").append("<br><lu>Wind: " + wind + " MPH</lu>");

/*
                          

{
  "coord": {
    "lon": -122.08,
    "lat": 37.39
  },
  "weather": [
    {
      "id": 800,
      "main": "Clear",
      "description": "clear sky",
      "icon": "01d"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 282.55,
    "feels_like": 281.86,
    "temp_min": 280.37,
    "temp_max": 284.26,
    "pressure": 1023,
    "humidity": 100
  },
  "visibility": 16093,
  "wind": {
    "speed": 1.5,
    "deg": 350
  },
  "clouds": {
    "all": 1
  },
  "dt": 1560350645,
  "sys": {
    "type": 1,
    "id": 5122,
    "message": 0.0139,
    "country": "US",
    "sunrise": 1560343627,
    "sunset": 1560396563
  },
  "timezone": -25200,
  "id": 420006353,
  "name": "Mountain View",
  "cod": 200
  }                         

                        

*/

    });
  }




$( document ).ready(function() {
    getTempHartford();
    getTeamHartfordFiveDays()
  
});
