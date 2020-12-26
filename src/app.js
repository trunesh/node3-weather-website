const path=require('path')
const express=require('express')
const hbs=require('hbs')
//const gecode=require('./utils/geocode')
const forecast=require('./utils/forecast.js')
const geocode = require('./utils/geocode.js')
//const { RSA_NO_PADDING } = require('constants')
// console.log(__dirname)
// //console.log(__filename)
// console.log(path.join(__dirname,'../public'))


const app=express()

//define path for express conifg
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)

hbs.registerPartials(partialsPath)

//Setup static directory to server
app.use(express.static(publicDirectoryPath))





// app.get('',(req,res)=>{
//     res.send('HELLO EXPREESS!')
// })

//app.com
//app.com/help
//app.com/about

// app.get('/help',(req,res)=>{
//     //res.send('Help page')
//     res.send([{
//         name:'Andrew',
//         age:27
//     },{
//         name:'Sarah',
//         age:30
//     }])
// })

// app.get('/about',(req,res)=>{
//     res.send('<h1>About</h1>')
// })

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Trunu L'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Page',
        name:'Trunu L'
    })
})


app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:'This is some helpful text',
        title:'Help',
        name:'Trunu L'
    })
})

app.get('/weather',(req,res)=>{
    //res.send('<h1>Your Weather</h1>')
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
            if(error){
                //return console.log(error)
                return res.send({error})
            }
            
            
            forecast(latitude,longitude,(error,forecastData )=>{
                if(error){
                    return res.send({error})
                }
                //console.log(forecastData)


                res.send({
                    //forecast:forecastdata,
                    forecast:forecastData,
                    location,
                    address:req.query.address
                })
            })
           
            

        })
    
})

app.get('/products',(req,res)=>{

    if(!req.query.search){
        return res.send({
            error:'You must provie a search term'
        })
    }
    console.log(req.query.search)

    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    //res.send('Help article not found')
    res.render('404',{
        title:'title',
        name:'Trunu L',
        errorMessage:'Help article not found'
    })
})

app.get('*',(req,res)=>{
    
    res.render('404',{
        title:'404',
        name:'Trunu L',
        errorMessage:'Page Not found.'
    })
})

app.listen(3000,()=>{
    console.log('Server is up on 3000.')
})