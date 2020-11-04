const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/display')

const app = express()

//path
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//using static path
app.use(express.static(publicDirectoryPath))


//setting hbs
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res)=>{
    res.render('index',{
        title: 'Covid-19 Report',
        name: 'pawan kharel',
    })
})
app.get('/country', (req, res)=>{
    if(!req.query.location){
        return res.send({
            Error: 'Address must be provided'
        })
    }
    console.log(req.query.location)
    forecast(req.query.location, (error, forecastData) =>{
        if(error){
            res.send({
                Error: error
            })
        }
        res.send({
            Forecast: forecastData
            
        })
    })
})

app.get('/products', (req,res)=>{
    console.log(req.query)
    res.send({
        products: []
    })
})
app.get('/about', (req, res)=>{
    res.render('about',{
        title: 'About Page',
        name: 'Pawan Kharel'
    })
})
app.get('/help', (req, res)=>{
    res.render('help',{
        title: 'About Page',
        name: 'Pawan Kharel'
    })
})
app.get('*', (req, res)=>{
    res.render('404',{
        title: '404',
        name: 'Pawan Kharel',
        errorMessage: 'Page Not Found!!'
    })
})
app.listen(3000, ()=>{
    console.log('Server is up to port 3000')
})