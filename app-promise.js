const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
    .options({
        a: {
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
var geocodeUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=rN4tM5wSFTOIINUorhozLTlWACeuGzqY&location=${encodedAddress}`;

axios.get(geocodeUrl).then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find that address');
    }

    var lat = response.data.results[0].locations[0].latLng.lat;
    var long = response.data.results[0].locations[0].latLng.lng;
    var weatherUrl = `https://api.darksky.net/forecast/4ef4be5a1997953443fe2fabf79b2c1f/${lat},${long}`;

    console.log("Address: " + response.data.results[0].locations[0].street);
    console.log("City: " + response.data.results[0].locations[0].adminArea5);
    console.log("State/Province: " + response.data.results[0].locations[0].adminArea3);
    console.log("Country: " + response.data.results[0].locations[0].adminArea1);
    console.log("Postal CODE: " + response.data.results[0].locations[0].postalCode);

    return axios.get(weatherUrl);

}).then((response) => {
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;
    console.log("Temperature " + temperature);
    console.log("Apparent Temperature " + apparentTemperature);

}).catch((e) => {
    if (e.code === 'ENOTFOUND') {
        console.log('Unable to connect to API servers.');
    } else {
        console.log(e.message);
    }
});

