// Initialize skycons
var centerIcon = new Skycons({"color":"#7EC0EE"});
var forecastIcons = new Skycons({"color":"#7EC0EE"});

// API Keys
var dsKey = "4e0bbcf49eb744845e626045fab57aee"; // Dark Sky
var ggKey = "AIzaSyDNRcAqPev76ZcnoyqJlTNeQw3Tt2NF_tY"; // Google Geocoding

// Some convienent arrays
var week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var winds = ["North", "East", "South", "West"];

// Get date information
var today = new Date();
var day = week[today.getDay()];
var date = today.getDate() + " " + month[today.getMonth()];
forecastDays = $("#forecast .col-xs-2 .row:first-child .col-xs-12");
for (i=1;i<7;i++) {
  if (today.getDay()+i >= 7) {
      next = (today.getDay()+i) - 7;
  } else {
      next = today.getDay() + i;
  }
  nextDay = week[next];
  forecastDays[i-1].innerHTML = nextDay;
}

// Set Date information
$("#day .col-xs-6:first-child").html(day);
$("#day .col-xs-6:last-child").html(date);

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
  var lat = position.coords.latitude;
  var lon = position.coords.longitude;
  var dsCall = "https://api.darksky.net/forecast/"+ dsKey + "/" + lat + "," + lon + "?callback=?";
  var gmCall = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lon + "&key=" + ggKey;

  $.getJSON(dsCall, function(weather){
    // Current weather
    cWeather = weather.currently;
    // Current temperature
    var cTemp = Math.round(cWeather.temperature) + "&deg;F";
    $("#current .col-xs-4").html(cTemp);
    // Center icon
    var cIcon = cWeather.icon;
    centerIcon.set("cIcon", cIcon);
    centerIcon.play();
    // Precipitation
    var precip = " " + Math.round(cWeather.precipProbability * 100) + "%";
    $("#conditions div:nth-child(1)").contents().last().replaceWith(precip);
    // Wind Direction
    var windDir = " " + winds[Math.round(cWeather.windBearing/90)];
    $("#conditions div:nth-child(2)").contents().last().replaceWith(windDir);
    // Wind Speed
    var windSpeed = " " + Math.round(cWeather.windSpeed) + " mph";
    $("#conditions div:nth-child(3)").contents().last().replaceWith(windSpeed);

    // Daily weather
    dWeather = weather.daily.data;
    console.log(dWeather);
    for (i=1;i<7;i++) {
      var fColumn = "#forecast .col-xs-2:nth-child("+i+")";
      var fTemp = Math.round((dWeather[i].temperatureMax + dWeather[i].temperatureMin) / 2) + "&deg;F";
      $(fColumn + " .row:last-child .col-xs-12").html(fTemp);
      // forecast icon
      var fIcon = dWeather[i].icon;
      forecastIcons.set("fIcon"+i, fIcon);     
    }
    forecastIcons.play();
  });

  // Get city/state using google geocoding API or IP on failure
  var cityST = -1;
  $.getJSON(gmCall, function(location){
    console.log(location);
      // Find correct object to get city and state
      for (i=0;i<location.results.length;i++) {
          match = 0;
          if (location.results[i].types.length==2) {
              if (location.results[i].types[0]=="locality" ||
                  location.results[i].types[0]=="political") {
                  match++;
              }
              if (location.results[i].types[1]=="locality" ||
                  location.results[i].types[1]=="political") {
                  match++;
              }
          }
          if (match==2) {
              cityST = i;
              break;
          }
      }

      if (cityST>=0) {
        var town = location.results[cityST].address_components[0].long_name;
        var state = location.results[cityST].address_components[2].short_name;

        // Set location
        location = town + ", " + state;
        $("#location .col-xs-12").html(location);
      }
      else { // Use ip lookup if geocoding fails
        $.get("https://ipinfo.io", function(response) {
          console.log(response);
          location = response.city + ", " + response.region;
          $("#location .col-xs-12").html(location);
        }, "jsonp");
      }




  });

  });
} else {
  console.log("Could net get location data.");
  $("#location").remove();
}