//console.log('Client side javascript file loaded')

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// }) 





const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault() //browser wont referesh with this
    
    const location=search.value
    //console.log(location)

    messageOne.textContent='Loading...'
    messageTwo.textConten=''

    fetch('http://localhost:3000/weather?address='+encodeURIComponent(location)+'').then((response)=>{
    response.json().then((forecastdata)=>{
        if(forecastdata.error){
            //console.log(forecastdata.error)

            messageOne.textContent=forecastdata.error
        }else{
            // console.log(forecastdata.address)
            // console.log(forecastdata.location)
            // console.log(forecastdata.forecast)
            messageOne.textContent=forecastdata.address+ '-' + forecastdata.location 
            messageTwo.textContent=forecastdata.forecast
        }
    })
})


})