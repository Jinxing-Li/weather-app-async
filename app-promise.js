const yargs = require('yargs');
const axios = require('axios');


const argv = yargs
     .option({
          a:{
               demand: true,
               alias: 'address',
               describe: 'Address to fetch weather for',
               string: true
          }
     })
     .help()
     .alias('help', 'h')
     .argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyA8_lRgqJ17uUzeUttzFSgpoaOZeXmKjaY`

axios.get(geocodeUrl).then((response) => {
     if (response.data.status == 'ZERO_RESULTS') {
          throw new Error('Unable to find that address.');
     }
     var lon = response.data.results[0].geometry.location.lng;
     var lat = response.data.results[0].geometry.location.lat;
     var weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=2e2cc437e883a6ce3490efaf6499ad35`;  
     console.log(response.data.results[0].formatted_address)
     return axios.get(weatherURL);
}).then((response) => {
     var temperature = response.data.main.temp;
     var feels_like = response.data.main.feels_like;
     console.log(`It's currently ${(temperature - 273.15).toFixed(2)}. It feels like ${(feels_like - 273.15).toFixed(2)}.`);
}).catch((e) => {
     if (e.code === 'ETIMEDOUT') {
          console.log('Unable to connect to API servers.');
     }
     else {
          console.log(e.message)
     }
})



