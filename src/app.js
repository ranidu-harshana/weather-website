const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const public_dir_path = path.join(__dirname, '../public')
const views_path = path.join(__dirname, '../templates/views')
const partials_path = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and view locations
app.set('view engine', 'hbs')
app.set('views', views_path)
hbs.registerPartials(partials_path)

// Setup static directory to serve
app.use(express.static(public_dir_path))

// routes
app.get('', (req, res) => {
    res.render('index', {
        title: 'Home Page',
        name: 'Ranidu Harshana'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Ranidu Harshana'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'About Page',
        name: 'Ranidu Harshana',
        message: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam, dolore neque! Facere sint sunt non animi illo delectus quasi officia, temporibus hic, at aliquam quibusdam repellat suscipit ea nesciunt repellendus?',
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Provide a valid address"
        }) 
    }

    geocode (req.query.address, (error, { latitude, longtitude, place_name } = {}) => {
        if(error){
            return res.send({ error }) 
        }
        
        forecast(longtitude, latitude, (error, forecast_data) => {
            if(error){
                return res.send({ error }) 
            }

            res.send({
                location: place_name,
                forecast: forecast_data,
                address: req.query.address
            })
        })
    })
    
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ranidu Harshana',
        error: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ranidu Harshana',
        error: 'Page not found'
    })
})

// run the server on port 3000
app.listen(port, () => {
    console.log('Server is up and running on port ' + port);
})