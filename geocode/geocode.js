const request = require('request');

var geocodeAddress = (address, callback) => {

    var encodedAddress = encodeURIComponent(address);

    request({
        url: `http://www.mapquestapi.com/geocoding/v1/address?key=rN4tM5wSFTOIINUorhozLTlWACeuGzqY&location=${encodedAddress}`,
        json: true
    }, (error, response, body) => {

        if (error) {
            callback('Unable to connect to Google servers.');
        } else if (body.status === "ZERO RESULTS") {
            callback('Unable to find that address.');
        } else {
            callback(undefined, {
                address: body.results[0].locations[0].street,
                adminArea6: body.results[0].locations[0].adminArea6,
                adminArea6Type: body.results[0].locations[0].adminArea6Type,
                adminArea4: body.results[0].locations[0].adminArea4,
                adminArea5Type: body.results[0].locations[0].adminArea5Type,
                adminArea3Type: body.results[0].locations[0].adminArea3Type,
                adminArea1Type: body.results[0].locations[0].adminArea1Type,
                postalCode: body.results[0].locations[0].postalCode,
                geocodeQualityCode: body.results[0].locations[0].geocodeQualityCode,
                geocodeQuality: body.results[0].locations[0].geocodeQuality,
                city: body.results[0].locations[0].adminArea5,
                state: body.results[0].locations[0].adminArea3,
                county: body.results[0].locations[0].adminArea1,
                latitude: body.results[0].locations[0].latLng.lat,
                longitude: body.results[0].locations[0].latLng.lng
            });
        }
    });
};


// https://api.darksky.net/forecast/4ef4be5a1997953443fe2fabf79b2c1f/45.487321,-73.640332

module.exports.geocodeAddress = geocodeAddress;