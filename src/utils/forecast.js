const request = require('request')

const forecast = (lat, long, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=0073c09409b0062f0c7efd15b2952f9d&query=" + lat + "," + long + "&units=m"

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to weather server!", undefined)
        } else if (body.error) {
            callback('Unable to find location!', undefined)
        } else {
            callback(undefined, '' + body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out. Humidity is ' + body.current.humidity)
        }
    })
}

module.exports = forecast