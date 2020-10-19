const path = require('path')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const express = require('express')
const hbs = require('hbs')

const app = express()

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialpath = path.join(__dirname, '../templates/partials')

//Use app.set when we use hbs for dynamic & have to file from view folder
app.set('view engine', 'hbs')
//Here, we telling express find view from location stored in viewsPath variable
app.set('views', viewsPath)
hbs.registerPartials(partialpath)

//Here, we telling express find static html files from location stored in publicDirectoryPath variable
app.use(express.static(publicDirectoryPath))



//Use app.get when we don't have to file from external folder
app.get ('',(req,res) => {
    res.render('index' ,{
        title:'Weather',
        name:"Arjun Parmar"
    })
})

app.get('/about' ,(req, res) =>{
    res.render('about',{
        title:'About me',
        name:'Arjun Parmar'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title:'Help',
        name:'Arjun Parmar'
    })
})

app.get('/weather' ,(req, res) => {
    if(!req.query.address){
        return res.send({
            error:'You must provide address'
        })
    }
    geocode(req.query.address,(geoCodeError, {latitude,longitude, location} ={}) =>{
        if(geoCodeError)
        {
            return res.send({
                error : geoCodeError
            })
        }

        forecast(latitude, longitude, (foreCastError, foreCastData) =>{
            if(foreCastError){
                return res.send({
                    error : foreCastError
                })
            }
            res.send({
                location :location,
                foreCast: foreCastData
            })
        })
    })
})


app.get('/products',(req,res) =>{
    if(!req.query.search){
        return res.send({
            error:'You must provide search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products :[]
    })
})

app.get('/help/*',(req,res) =>{
    res.render('404' ,{
        title:'404',
        name:'Arjun Parmar',
        errorMessage:'Help Article not Found'
    })
})

app.get('*',(req,res) =>{
    res.render('404' ,{
        title:'404',
        name:'Arjun Parmar',
        errorMessage: 'Ooops...Page Not Found'
    })
})

app.listen(3000 ,() => {
    console.log('Server is up on port 3000')
})


