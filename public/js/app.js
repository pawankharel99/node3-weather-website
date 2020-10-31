const weatherForm = document.querySelector('form')
const searchValue = document.querySelector('input')
const message1 = document.querySelector('.message1')
const message2 = document.querySelector('.message2')
console.log('hello')
weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()

    const location = searchValue.value
    message1.textContent = 'Loading..'
    message2.textContent = ''

    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.Error){
            message1.textContent = data.Error
        }else{
            message1.textContent = data.location
            message2.textContent = data.Forecast

        }
    })
})
})