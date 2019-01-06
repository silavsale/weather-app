const request = require('request');
const yargs = require('yargs');

const argv = yargs
    .options({
        t: {
            demand: true,
            alias: 'temperature',
            describe: 'Coordinates to fetch temperature',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

var geocodeAddress = (temperature) => {

    // var encodedAddress = encodeURIComponent(address);
    var lat = encodeURIComponent(temperature);

    request({
        // url: `http://www.mapquestapi.com/geocoding/v1/address?key=rN4tM5wSFTOIINUorhozLTlWACeuGzqY&location=${encodedAddress}`,
        // url: `https://api.darksky.net/forecast/4ef4be5a1997953443fe2fabf79b2c1f/${lat},-73.640332`,
        url: `https://api.darksky.net/forecast/4ef4be5a1997953443fe2fabf79b2c1f/56.249454,-110.567405`,
        json: true
    }, (error, response, body) => {

        if (error) {
            console.log('Unable to connect to Forecast.io servers.');
        } else if (response.statusCode === 400) {
            console.log('Unable to fetch weather.');
        } else if (!error && response.statusCode === 200) {
            console.log(`latitude: ${body.latitude}`);
            console.log(`longitude: ${body.longitude}`);
            var fahrenheit = (body.currently.temperature - 32) * (5 / 9);
            console.log(`temperature: &#x2103 ${parseInt(fahrenheit)}`);
        } else {
            console.log('Unable to fetch weather.');
        }
    });
};

geocodeAddress(argv.temperature);

// 4ef4be5a1997953443fe2fabf79b2c1f

// https://api.darksky.net/forecast/4ef4be5a1997953443fe2fabf79b2c1f/45.487321,-73.640332