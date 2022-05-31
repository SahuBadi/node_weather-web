

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data) 
//     })
// })

fetch('/weather?address=').then((response) => {
    response.json().then((data) => {
        if (data.error) {
            console.log(data.error)
        } else {
            console.log(data.location)
            console.log(data.forecast)
            // console.log(data)
        }
       
    })
})

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


// messageOne.textContent = 'From JavaScript'

weatherForm.addEventListener('submit', (event) => { //normalmente e
    event.preventDefault()// refresca sólo el formulario, no toda la página

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent = data.error
            console.log(data.error)
        } else {
            messageOne.textContent = data.location
            messageTwo.textContent =  data.forecast.temperature + data.forecast.description
            console.log(data.location)
            console.log(data.forecast)
            // console.log(data)
        }
       
    })
})

    console.log(location)
})