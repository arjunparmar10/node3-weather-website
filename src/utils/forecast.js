const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=1ec1a08e32163ca72a4e9466a24afe37&query=' + encodeURIComponent(lat) + ',' + encodeURIComponent(long)
    //Before Destructuring and Property Shorthand Challenge ::: request({url:url, json:true},(error, response) =>{
    request({url, json:true},(error, { body}) =>{
        if(error){
            callback('Unable to Connect Weather Service', undefined)
        }else if(body.error){                          //Before Destructuring and Property Shorthand Challenge ::: }else if(response.body.error){
            callback('Unable find Location', undefined)
        }else{
            callback(undefined,
                body.current.weather_descriptions[0]   //Before Destructuring and Property Shorthand Challenge ::: response.body.current.weather_descriptions[0]
                + ". It is currently " +
                body.current.temperature +             //Before Destructuring and Property Shorthand Challenge ::: response.body.current.temperature +
                " degrees out. It feels like " +
                body.current.feelslike +                //Before Destructuring and Property Shorthand Challenge ::: response.body.current.feelslike +
                " degrees out")
        }
    })
}

module.exports = forecast