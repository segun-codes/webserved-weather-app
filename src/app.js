const express = require('express');
const path = require('path');
const hbs = require('hbs');
const cors = require('cors');
const geocodeService = require('./util/mapbox-geocode.js');
const forecastService = require('./util/forecast-weather.js');

const app = express();

//Define path for Epxress Config
const publicDirectoryPath = path.join(__dirname, '../public'); //sets up path to public folder
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);


//THE FOLLOWING APPLY IF NOT USING ANY TEMPLATE ENGINE AND WHEN FOCUS IS TO SERVE ONLY STATIC ASSETS
//with this, requests to static files through '/', '/help.html' and '/about.html' 
//are served from their respective .html files in the public folder. 
//No need to setup 'app.get' routing for them again. So 'localhost:3000/about.html' auto-loads
app.use(cors());
app.use(express.static(publicDirectoryPath));


app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Segun Adodo'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Need help?? We are here for you...',
        name: 'Segun Adodo'
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Segun Adodo'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        });
    }

    const address = req.query.address; 
    geocodeService.supplyGeocode(address, (error, geocodeData) => {
        if(error) {
            return res.send({
                error/*: 'You must provide an address'*/
            });
        } else {
            forecastService.forecastWeather(geocodeData, (error, forecastData) => {
                if(error) {
                    return res.send({
                        error/*: 'You must provide an address'*/
                    });
                } else {
                    res.send({
                        address: req.query.address,
                        forecast: forecastData, 
                        location: geocodeData.location
                    });
                }
            });
        }
    });
});

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    } 

    res.send({
        products: []
    })
    
});

app.get('/help/*', (req, res) => {
    res.render('error-page', {
        title: '404',
        name: 'Segun Adodo',
        errorMessage: 'Help page not found'
    });
});

//
app.get('*', (req, res) => {
    res.render('error-page', {
        title: '404',
        name: 'Segun Adodo',
        errorMessage: 'Page not found'
    });
});

app.listen(5500, () => {
    console.log("CORS-enabled server is up on port 5500");
});