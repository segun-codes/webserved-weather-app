const request = require('request');

/*
*   
*/

//Supplies coordinates of a given location supported by Mapbox webservices
const supplyGeocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=sk.eyJ1IjoiYWRvdWdoZG91Z2giLCJhIjoiY2w4ZWJjNWt3MTAydzNwcTl0cHhxOHhpeiJ9.RWHKVoQwXucXScGNDiXo6w&limit=1`;        

    request({ url, json: true }, (error, response, body) => {
        if(error) {
            callback('Unable to connect to location services. Please, check your network settings.', undefined);
        } else if(!response.body.features.length) {
            callback('Unable to find location. Please, try another address.', undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name 
            });
        }
    });
}

module.exports = {
    supplyGeocode
}