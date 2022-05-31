const path = require('path')
const express = require('express')
//Partial templates para los headers o footers (que se emplearán a lo largo de todas las páginas de la web para darle una unificación)
const hbs = require('hbs')

const port = process.env.PORT || 3000 //el puerto de una variable de entorno (environment variable) facilitado por heroku o en su defecto el local 3000

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)//emplearemos para crear el camino correcto a public (base para la ruta)
// console.log(path.join(__dirname, '../public'))//modificamos el dirname para establecer la ruta correcta y conectar con public

const app = express()

//+++++  Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
//si cambiamos el nombre del archivo en el que se encuentran las vistas (de views a templates) se crea una desconexión y error, por eso creamos una nueva variable para redireccionar a la nueva carpeta (como si establecieramos una nueva ruta)
const viewsPath = path.join(__dirname, '../templates/views')
//app.use(express.static(path.join(__dirname, '../public')))
const partialsPath = path.join(__dirname, '../templates/partials')

//+++++  Setup handlebars engine an views location
app.set('view engine', 'hbs')
//establecemos un nuevo set para conectar las vistas a la nueva ruta guardada en la variable viewsPath
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//+++++++  Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'App del Tiempo',
        name: 'Mª Delia Sahuquillo'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Sobre nuestra página',
        name: 'Mª Delia Sahuquillo'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpquest: 'pregunta',
        title: 'Ayuda',
        name: 'Mª Delia Sahuquillo'
    })
})


// app.get('', (req, res) => {  //primer argumento= ruta/ segundo argumento= función donde se describe lo que debe realizar en la ruta particular especificada
//     res.send('<h1>Welcome to weather app</h1>')//dentro de la función hay otros dos argumentos: 1º el objeto que contiene info de la llamada entrante(petición) al servidor (request), 2º la respuesta (response) que contiene variedad de métodos para personalizar lo que devolveremos a la petición                
// })   //ya la podemos eliminar la primera página ya que al hacer conexión con public automáticamente la primera viene marcada por el index de allí

// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'Delia',
//         age: 36
//     },{
//         name: 'Miquel',
//         age: 43
//     }])
// })

// app.get('/about', (req, res) => {
//     res.send('<iframe width="444" height="250" src="https://www.youtube.com/embed/--iIhAnbVu0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>')
// })



app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => { 
        if (error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => { 
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
            // console.log(location)
            // console.log(forecastData)
        })
    })
    // res.send({
    //     forecast: 'Sunny day',
    //     location: 'Palma de Mallorca',
    //     address: req.query.address
    // })
})

//Query string endpoint donde aceptaremos la dirección de donde beberemos los datos
// Segunda url que nos traerá datos json
// app.get('/products', (req, res) => {
//     if (!req.query.search) {
//         return res.send({
//             error: 'You must provide a search term.'
//         })
//     }
//     console.log(req.query.search)
//     res.send({
//         products: []
//     })
// })

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Mª Delia Sahuquillo',
        errorMessage: 'Help article not found'})  
})
   
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Mª Delia Sahuquillo',
        errorMessage: 'My 404 page'})  

})
            

//app.com              -----------se puede acceder a la raíz o a diferentes extensiones
//app.com/help
//app.com/about

app.listen(port, () => {
    console.log('Server is up on port ' + port) //no se para si no lo cerramos nosotros intencionalmente, se queda abierto a la espera de peticiones ---Cntrl+c para pararlo
}) //puerto, función cuando se establece conexión correctamente