const request = require('request');

//const forecastWeather = (lat, long, callback) => {
const forecastWeather = ( { latitude: lat, longitude: long }, callback) => {

    const url = `http://api.weatherstack.com/current?access_key=24d4e26abf62a6e5b8f41353f83ebda5&query=${encodeURIComponent(lat)},${encodeURIComponent(long)}`;  //37.8267,-122.4233

    //request({url: url, json: true}, (error, response, body) => {
    request({url, json: true}, (error, response, body) => {
        if(error) {
            callback('Unable to reach weather services. Consider checking your network settings', undefined);
        } else if(response.body.error) {
            callback('Unable to find location. Try another set of coordinates', undefined);
        } else {
            callback(undefined, `${ body.current.weather_descriptions[0] } at the moment. Temperature is currently ${body.current.temperature} celsius. Apparent temperature is ${body.current.feelslike} celsius and wind direction is ${body.current.wind_dir}`);
            console.log(body.current);
        }
    });
}

module.exports = {
    forecastWeather
}


/*
weatherService.forecastWeather(44.1545, -75.7088, (error, data) => {
    console.log('Error:', error);
    console.log('Data', data);
});
*/

