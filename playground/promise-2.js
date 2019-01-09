const request = require('request');

var geocodeAddress = (address) => {

    return new Promise((resolve, reject) => {
        var encodedAddress = encodeURIComponent(address);

        request({
            url: `http://www.mapquestapi.com/geocoding/v1/address?key=rN4tM5wSFTOIINUorhozLTlWACeuGzqY&location=${encodedAddress}`,
            json: true
        }, (error, response, body) => {

            if (error) {
                reject('Unable to connect to Google servers.');
            } else if (body.status === "ZERO RESULTS") {
                reject('Unable to find that address.');
            } else {
                resolve({
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
    });
};

geocodeAddress("234dff2rf2f23f3").then((location) => {
    console.log(JSON.stringify(location, undefined, 2))
}, (errorMessage) => {
    console.log(errorMessage);
});