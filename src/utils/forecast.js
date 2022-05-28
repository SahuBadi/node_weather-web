const request = require('request')


// const forecast = (latitude, longitude, callback) => {
//     const url = 'http://api.weatherstack.com/current?access_key=1c030f904848fdb85da7dd90a6da64cf&query='+ latitude +','+ longitude+''
//     request({ url: url, json: true}, (error, response) => {
//         if (error) {
//             callback('Unable to connect to weather service', undefined)
//         } else if (response.body.error) {
//             callback('Unable to find location', undefined)
//         } else {
//             //callback(undefined, response.body.current.weather_descriptions[0] +": Hoy hace una temperatura de "+ response.body.current.temperature +" grados, pero la sensación térmica es de "+ response.body.current.feelslike +" grados, con una humedad del "+ response.body.current.humidity +"% .")
//             callback(undefined, {
//                 locationName: response.body.location.name,
//                 country: response.body.location.country,
//                 temperature: response.body.current.temperature,
//                 description: response.body.current.weather_descriptions[0]
//             })
//         }
//     })
// }


//---Ejercicio Destructuring y Property Shorthand---//


const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=1c030f904848fdb85da7dd90a6da64cf&query='+ latitude +','+ longitude+''
    request({ url, json: true}, (error, {body}) => { //response es un objeto que sabemos contiene el body, así que lo cambiamos por {body}
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            //callback(undefined, response.body.current.weather_descriptions[0] +": Hoy hace una temperatura de "+ response.body.current.temperature +" grados, pero la sensación térmica es de "+ response.body.current.feelslike +" grados, con una humedad del "+ response.body.current.humidity +"% .")
            callback(undefined, {
                locationName: body.location.name,
                country: body.location.country,
                temperature: body.current.temperature,
                description: body.current.weather_descriptions[0]
            })
        }
    })
}

module.exports = forecast