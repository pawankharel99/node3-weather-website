const request = require('request')

const forecast = (latitude, longitude, callback)=>{
    url = 'http://api.weatherapi.com/v1/forecast.json?key=85bd7dabae8142bfa5d92318202710&q='+ latitude +','+ longitude

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (response.body.error) {
            callback(response.body.error.message, undefined)
        } else {
            callback(undefined, 'It is currently '+response.body.current.temp_c+' degree celcius.')
        }
    })

}

module.exports = forecast