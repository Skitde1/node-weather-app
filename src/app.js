const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { query } = require('express')
const { argv } = require('process')
const request = require('request')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Steup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) =>{
    res.render('index', {
        title: 'Weather App',
        name: 'Bacea'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title:'About me',
        name: 'Bacea'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        number: 2345679,
        title: 'Help',
        name:'Bacea'
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search){
        return res.send({
            error: 'You must provide a search term!'
        })
    }
     console.log(req.query.search)
     res.send({
         products:[]
     })
})

app.get('/weather', (req, res) => {
    if(!req.query.adress){
        return res.send({
            error:'You must provide an adress!'
        })
    }
    //
    geocode(req.query.adress, (error, {latitude, longitude, location} = {} ) => {
        if(error){
            return res.send({error:error})
        }

        forecast(latitude,longitude, (error, Forecastdata) => {
            if(error){
              return res.send({error:error})
            }
            res.send({
                location,
                forecast: Forecastdata,
                adress:req.query.adress
            })
          })
      })

    //
})

app.get('/help/*', (req, res) => {
    res.render('error',{
        text: 'Help article not found.',
        title: 'Error',
        name:'Bacea'
    })
})

app.get('*', (req, res) => {
    res.render('error',{
        text: 'Page not found.',
        title: 'Error',
        name:'Bacea'

    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})