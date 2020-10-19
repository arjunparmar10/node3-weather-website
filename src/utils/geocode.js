const request = require('request')


const geoCode = (address, callback) => {
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYXJqdW5wYXJtYXIxMDExIiwiYSI6ImNrZ2FlejlhejA2Zm4yc3M1ZGhwcGhhM3QifQ.AKlmd7lwdwP6pPETNx68mw&limit=1'
//Before Destructuring and Property Shorthand Challenge ::: request({url:url, json:true},(error, response) =>{
    request({url, json:true},(error, { body }) =>{
        if(error) {
            callback('Unable to connect to location service!', undefined)
        }else if(body.features.length === 0){                  //Before Destructuring and Property Shorthand Challenge :::}else if(response.body.features.length === 0){
            callback('Unable to find location', undefined)
        }else{
            callback(undefined, {
                location : body.features[0]["place_name"],     //Before Destructuring and Property Shorthand Challenge :::location : response.body.features[0]["place_name"],
                latitude: body.features[0]["center"][1],       //Before Destructuring and Property Shorthand Challenge :::latitude: response.body.features[0]["center"][1],
                longitude: body.features[0]["center"][0]       //Before Destructuring and Property Shorthand Challenge :::longitude: response.body.features[0]["center"][0]
            })
        }
    })
}

module.exports = geoCode