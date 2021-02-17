function getWeather(city) (
let key = 

)








//
function getWeather(city) {
  const weatherUrl = new URL('https://api.openweathermap.org/data/2.5/weather');
  const weatherAPI = '72d2423654791579805b5a37cee9cbfd';

  //
  weatherUrl.searchParams.append(' ', city);
  weatherUrl.searchParams.append('appid', appID);
  weatherUrl.searchParams.append('mode', 'json');
  weatherUrl.searchParams.append('units', 'metric');
  weatherUrl.searchParams.append('lang', 'en');

  //
  return weatherUrl;
}

//
function getAttraction(city) {
fetch 





  const attractionUrl = new URL('https://api.foursquare.com/v2/venues/explore');
  const clientID = "NR1JWNHEVYIMWD4UAZMT5DFLV0KQZBSZM1JZMEOKMAUATZM3";
  const clientSecret = "3JTEDSX1HKALV55RBV2TBOYJB4LUBT01W23AOZPQYLZ5BF1D";

  //
  attractionUrl.searchParams.append('near', city);
  attractionUrl.searchParams.append('client_id', clientId);
  attractionUrl.searchParams.append('client_secret', clientSecret);
  attractionUrl.searchParams.append(' ', today);
  attractionUrl.searchParams.append('limit', '3');

  //
  return attractionUrl;
}

/* Inte alls färdig, är inte i toppform heller, får lägga ner mer tid på kompletteringen istället */