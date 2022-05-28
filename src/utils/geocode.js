const request = require('request')

// const geocode =(address, callback) => {
//     const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYWlsZWQiLCJhIjoiY2wzNGllaTdkMDJ5ZzNrcnV4dmd4cWJsYyJ9.wC4MO_vIgsk-DpxVhqMalA'
//     request({ url: url, json: true}, (error, response) => {
//         if (error) {
//             callback('Unable to connect to location services', undefined)
//         } else if (response.body.features.length === 0 || response.body.features === undefined) {
//             callback('Unable to find location', undefined)
//         } else {
//             callback(undefined, {
//                 latitude: response.body.features[0].center[1],
//                 longitude: response.body.features[0].center[0],
//                 location: response.body.features[0].place_name
//             })
//         }
//     })
// }


//---Ejercicio Destructuring y Property Shorthand---//

const geocode =(address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYWlsZWQiLCJhIjoiY2wzNGllaTdkMDJ5ZzNrcnV4dmd4cWJsYyJ9.wC4MO_vIgsk-DpxVhqMalA'
    request({url, json: true}, (error, {body}) => { //response es un objeto que sabemos contiene el body, así que lo cambiamos por {body}
        if (error) {
            callback('Unable to connect to location services', undefined)
        } else if (body.features.length === 0 || body.features === undefined) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode