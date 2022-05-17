const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const options = {
        method: 'GET',
        json: true,
        url: 'https://foreca-weather.p.rapidapi.com/forecast/daily/'+longitude+','+latitude+'',
        qs: {alt: '0', tempunit: 'C', windunit: 'MS', periods: '8', dataset: 'full'},
        headers: {
            'X-RapidAPI-Host': 'foreca-weather.p.rapidapi.com',
            'X-RapidAPI-Key': '23175412d3mshf01af3c73f79a6ep137a07jsna012e5e449fb',
            useQueryString: true
    }
    };

    request(options, function (error, response, body) {
        console.log(body);
        if (error){
            callback("Unable to connect the weather service", undefined)
        } else {
            try {
                callback(undefined, "It is curently "+body.forecast[0].maxFeelsLikeTemp+" degrees out. The hight temperature today is "+body.forecast[0].maxTemp+" degrees with a low of "+body.forecast[0].minTemp+" degrees. There is "+ body.forecast[0].precipProb+ "% chance of rain")
            } catch (error) {
                callback('Unable to find location', undefined)
            }
            
        }
    });
}

module.exports = forecast