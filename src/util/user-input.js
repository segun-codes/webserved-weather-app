const format = require('./formatter');


//Reads user input into the program
//User must enter location in double quotes (e.g., "Port Harcourt Nigeria", "Lagos" etc.)
const getUserLocation = () => {
    
    const location = process.argv[2];

    if(!location | !(Number.isNaN(Number(location)))) {
        return console.log(format.redify("Please, provide a valid location. For example, 'Port Harcourt' or 'Lagos"));
    }

    return location;
}

module.exports = {
    getUserLocation: getUserLocation
}