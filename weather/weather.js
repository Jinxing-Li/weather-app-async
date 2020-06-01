const request = require('request')

var getWeather = (lat, lon, callback) => {
     request({
          url: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=2e2cc437e883a6ce3490efaf6499ad35`,
          json: true
     }, (error, response, body) => {
          if (error){
               callback('Unable to connect to Forecast.io server.');
          } else if (response.statusCode === 400) {
               callback('Unable to fetch weather.');
          } else if (response.statusCode === 200) {
               t = (body.main.temp)
               callback(undefined, {
                    temperature: (t - 273.15).toFixed(2) ,
                    feels_like:  (body.main.feels_like - 273.15).toFixed(2),
                    weather: body.weather
               });
          }     
     });
};

module.exports.getWeather = getWeather;