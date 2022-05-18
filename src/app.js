//core modules
const path = require('path')
//npm module
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
// the following "PORT" will be set on Heroku
const port = process.env.PORT || 3000

//define (absolute) paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Andrew"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Andrew mead'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        message: "This is an help page.",
        title: "Help",
        name: "Andrew."
    })
})



// app.get('/about', (req, res) => {
//     res.send('<h3>About</h3>')
// })

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide address to get weather cast.'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide search term.'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help 404',
        name: "andrewww",
        errorMessage: "Help article not found."
    })
})

//this must be placed at last
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrewww',
        errorMessage: 'Page not found.'
    })
})

//port:3000
app.listen(port, () => {
    console.log('Server is up on port ' + port)
});