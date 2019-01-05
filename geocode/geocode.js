const request = require('request');

var geocodeAddress = (address) => {

    var encodedAddress = encodeURIComponent(address);

    request({
        url: `http://www.mapquestapi.com/geocoding/v1/address?key=rN4tM5wSFTOIINUorhozLTlWACeuGzqY&location=${encodedAddress}`,
        json: true
    }, (error, response, body) => {

        if (error) {
            console.log('Unable to connect to Google servers.');
        } else if (body.status === "ZERO RESULTS") {
            console.log('Unable to find that address.');
        } else {
            console.log(`Address: ${body.results[0].locations[0].street}`);
            console.log(`City: ${body.results[0].locations[0].adminArea5}`);
            console.log(`State: ${body.results[0].locations[0].adminArea3}`);
            console.log(`County: ${body.results[0].locations[0].adminArea1}`);
            console.log(`Latitude: ${body.results[0].locations[0].latLng.lat}`);
            console.log(`Longitude: ${body.results[0].locations[0].latLng.lng}`);
            console.log(`mapUrl: ${body.results[0].locations[0].mapUrl}`);
        }
    });
};


// https://api.darksky.net/forecast/4ef4be5a1997953443fe2fabf79b2c1f/45.487321,-73.640332

module.exports.geocodeAddress = geocodeAddress;