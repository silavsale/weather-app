const request = require('request');
const yargs = require('yargs');

var getWeather = (lat, long, callback) => {

    request({
        // url: `https://api.darksky.net/forecast/4ef4be5a1997953443fe2fabf79b2c1f/${lat},-73.640332`,
        url: `https://api.darksky.net/forecast/4ef4be5a1997953443fe2fabf79b2c1f/${lat},${long}`,
        json: true
    }, (error, response, body) => {

        if (error) {
            callback('Unable to connect to Forecast.io servers.');
        } else if (response.statusCode === 400) {
            callback('Unable to fetch weather.');
        } else if (!error && response.statusCode === 200) {
            let fahrenheit = (body.currently.temperature - 32) * (5 / 9);
            let fahrenheitAp = (body.currently.apparentTemperature - 32) * (5 / 9);

            callback(undefined, {
                temperature: parseInt(fahrenheit),
                apperentTemperature: parseInt(fahrenheitAp)
            });
            // callback (`temperature: &#x2103 ${ parseInt(fahrenheit)}`);
        } else {
            console.log('Unable to fetch weather.');
        }
    });
};

module.exports.getWeather = getWeather;

// geocodeAddress(argv.temperature);

// 4ef4be5a1997953443fe2fabf79b2c1f

// https://api.darksky.net/forecast/4ef4be5a1997953443fe2fabf79b2c1f/45.487321,-73.640332