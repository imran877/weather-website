const request=require('postman-request')
const forecast=(latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=1f2c9ebfedc995c7dea83311fe5cbae2&query=' + latitude + ',' + longitude + '&units=f'
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to weather servce!',undefined)

        }else if(body.error){
            callback('Unable to find location!',undefined)

        }else{
            callback(undefined,body.current.weather_descriptions[0] + ' It is currently ' + body.current.temperature + ' degress out. There is a ' + body.current.precip + '% chance of rain.')

        }

    })


}
module.exports=forecast