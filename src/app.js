const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()


//Define path for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setting up handle bars engine
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//customize the server for static directory
app.use(express.static(publicDirectoryPath))

 app.get('', (req, res)=>{
     res.render('index',{
         title: 'Weather',
         name: 'pawan kharel'
     })
 })
app.get('/about',(req, res)=>{
    res.render('about',{
        title: 'About Me',
        name: 'Pawan Kharel'
    })
})
app.get('/help',(req, res)=>{
    res.render('help',{
        title: 'HELP',
        message: 'Please log in to get help',
        name: 'Pawan Kharel'
    })
})
app.get('/weather',(req, res)=>{
    if(!req.query.address){
        return res.send({
            Error: 'Address must be provided'
        })
    }
    console.log(req.query.address)
    geocode(req.query.address, (error, data)=>{
        if(error){
            return res.send({
                Error: error
            })
        }
    forecast(data.latitude, data.longitude, (error, forecastData)=>{
        if(error){
            res.send({
                Error: error
            })
        }
        res.send({
            Forecast: forecastData,
            location: data.location,
            address: req.query.address
        })
    })
    
})
})

app.get('/products', (req, res)=>{
    if(!req.query.search){
        return res.send({
            Error: 'You must provide a search term.'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})
app.get('/help/*',(req, res)=>{
    res.render('404',{
        title: 'ERROR',
        message: 'Help article not found.',
        name: 'Pawan Kharel'
    })
})
//for error * represents as wild card 
app.get('*', (req, res)=>{
    res.render('404',{
        title: 'ERROR',
        message: 'Page not found.',
        name: 'Pawan Kharel'
    })
})

app.listen(3000, ()=>{
    console.log('server is up to port 3000.')
})