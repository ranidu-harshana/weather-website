const request = require('request')

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(address) +".json?access_token=pk.eyJ1IjoicmFuaWR1aGFyc2hhbmEiLCJhIjoiY2wzNzVtdWg1MGx2bjNqbnVpaG4zOXdsYyJ9.jJguTCTzPLw1A46ibTvfYA&limit=1"
    request({url: url, json: true}, (error, response, body) => {
        if (error) {
            callback('Unable to connect the location service', undefined)
        }else if(body.features.length === 0){
            callback('Unable to find the location. Try another search', undefined)
        } else {
            callback(undefined, {
                longtitude:  body.features[0].center[0],
                latitude: body.features[0].center[1],
                place_name: body.features[0].place_name
            })
        }
        
    })
}

module.exports = geocode