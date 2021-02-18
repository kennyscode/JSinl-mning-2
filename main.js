// Openweather API-call
function getWeather(city) {
  let key = '72d2423654791579805b5a37cee9cbfd';
  var wacttractionBox = document.getElementsByClassName("AttractionBox");
  if (wacttractionBox.length > 0) {
      Array.from(document.getElementsByClassName("AttractionBox")).forEach(
          function(element, index, array) {
              element.remove();
          }
      );
  }
  var weatherbox = document.getElementById("WeatherBox")
  if (typeof(weatherbox) != 'undefined' && weatherbox != null) {
      weatherbox.remove();
  }
 // Hämtar API data från openweatermap och kollar ifall den returnar korrekt respons, om den ej gör det ska den returnera error meddelande. Även checkboxerna kontrolleras och vad som då ska visas när de väljs.
  fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + key + '')
      .then(function(response) {
          if (response.ok) {
              return response.json();
          } else if (response.status === 400 || response.status === 404) {
              alert(city + " PLEASE ENTER A VALID CITY NAME.")
          } else if (response.status === 500) {
              alert("ERROR. PLEASE ENTER VALID INPUT.")
          } else {
              alert("ERROR. TRY AGAIN.")
          }
      })

      .then(function(weather) {
        if (document.getElementById("onlyWeather").checked && (document.getElementById("onlyAttractions").checked)) {
            displayWeather(weather)
            getAttraction(city)
        }

         else if (document.getElementById("onlyWeather").checked) {
              displayWeather(weather)
          } else if (document.getElementById("onlyAttractions").checked) {
              getAttraction(city)
          } else {
              displayWeather(weather)
              getAttraction(city)
          }
      })
      .catch(function(error) {
          console.log(error.message);
      });
      
}

// Ser till att det blir till rätt temperatursmått
function getCelsius(kelvin) {
    var fTemp = kelvin;
    var fToC = (fTemp - 273);
  
    return Math.trunc(fToC);
  }


// DISPLAY ATTRACTIONS
function displayAttractions(attractions) {
  var wacttractionBox = document.getElementsByClassName("AttractionBox");
  if (wacttractionBox.length > 0) {
      Array.from(document.getElementsByClassName("AttractionBox")).forEach(
          function(element, index, array) {
              element.remove();
          }
      );
  }
  for (i = 0; i < 8; i++) {
      var attractionBox = document.createElement("div");
      attractionBox.id = i;
      attractionBox.className += "AttractionBox";
      var Name = document.createElement("h5");
      Name.innerHTML = "Address: " + attractions.response.groups[0].items[i].venue.name;

      var Address = document.createElement("h6");
      Address.innerHTML = attractions.response.groups[0].items[i].venue.location.address;

      attractionBox.append(Name);
      attractionBox.append(Address);

      document.body.append(attractionBox);
  }
}


// FORSQUARE CLIENT AND TOP ATTRACTIONS, getAttraction API från Foursquare
function getAttraction(city) {
  fetch('https://api.foursquare.com/v2/venues/explore?client_id=' + 'NR1JWNHEVYIMWD4UAZMT5DFLV0KQZBSZM1JZMEOKMAUATZM3' + '&client_secret=' + '3JTEDSX1HKALV55RBV2TBOYJB4LUBT01W23AOZPQYLZ5BF1D' + '&near=' + city + '&limit=10&v=20210211')
      .then(function(response) {
          if (response.ok) {
              return response.json();
          } 
      })
      .then(function(attractions) {
          displayAttractions(attractions);

      })
      .catch(function(error) {
          console.log(error.message);
      });
}




// DISPLAY WEATHER, kontrollerar om det redan finns en befintlig weatherbox, och tar bort om det redan finns det
function displayWeather(weather) {
  var weatherbox = document.getElementById("WeatherBox")
  if (typeof(weatherbox) != 'undefined' && weatherbox != null) {
      weatherbox.remove();
  }
  var box = document.createElement("div");
  box.id = "WeatherBox"
  var cityName = document.createElement("h5")
  cityName.innerHTML = "Stadnamn: " + weather.name;

  var temp = document.createElement("h5")
  temp.innerHTML = "Temperatur: " + getCelsius(weather.main.temp) + "°C";
  box.append(cityName);
  box.append(temp);
  document.body.append(box);

  var c = getCelsius(weather.main.temp);

}