
const request=require('request')

const forecast=(latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=7858971e87c7ecf1d1ef50f46ee64c91&query='+encodeURIComponent(latitude) +','+encodeURIComponent(longitude) +'&units=m'
    //console.log(url)
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect location service',undefined)
        }else if(body.error){
            callback('Unable to find weather for current location try again',undefined)
        }else{
            const myvar=body.current
            callback(undefined,'Current temperature is '+ myvar.temperature + ' degrees and its feels like  ' + myvar.feelslike + '. Current weather is ' + myvar.weather_descriptions[0])
            //callback2(undefined,'Current temperature is '+ myvar.temperature + ' degress and its feels like  ' + myvar.feelslike + ' degrees')
        }
    })
}

module.exports=forecast