const request = require('request')

const geocode = (address, callback) => {
    const url = 'http://api.weatherapi.com/v1/forecast.json?key=85bd7dabae8142bfa5d92318202710&q='+ encodeURIComponent(address)

    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (response.body.error) {
            callback(response.body.error.message, undefined)
        } else {
            callback(undefined, {
                latitude: response.body.location.lat,
                longitude: response.body.location.lon,
                location: response.body.location.name
            })
        }
    })
}

module.exports = geocode 