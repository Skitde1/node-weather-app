console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

//messageOne.textContent = 'From JavaScript'

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const location = searchElement.value

    messageOne.textContent = 'Te ....'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?adress=' + location).then((response) =>{
        response.json().then((data) =>{
            if(data.error){
                messageOne.textContent = data.error
            }else{
                messageOne.textContent =  data.location
                messageTwo.textContent =  data.forecast
            }
        })
    })

})