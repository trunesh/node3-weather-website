const request=require('request')

const geocode=(address,callback)=>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) +  ".json?access_token=pk.eyJ1IjoiaDJvc3VuIiwiYSI6ImNraW93M29mNTFnbnAzMG13YmZja3FxMnUifQ.h5Z3LT4pCqL8hB5ZGIr18Q&limit=1"
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('unable to connect to location services',undefined) // or u can empty 2nd parameter

        }else if(body.features.length===0){
            callback('Unable to find location. Try another search',undefined)
        }else{
            const arr=body.features[0]
            callback(undefined,{
                latitude:arr.center[1],
                longitude:arr.center[0],
                location:body.features[0].place_name
            })
        }
    })
}


module.exports=geocode