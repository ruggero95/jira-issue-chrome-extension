const express = require('express')
const app = express()
const axios = require('axios')
const cors = require('cors')
const https = require('https') 
var bodyParser = require('body-parser')

app.use(cors({
    origin: '*',    
}));
app.use( bodyParser.json() );   
const instance = axios.create({
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    }), 
})
app.get('/',async function (req, res) {
    try{
        const URL = req.url.replace('/?url=','')    
        const token = Buffer.from(req.headers.authorization.split(' ')[1],'base64').toString().split(':')[1]
        const forwardHeader = {
            headers:{
                maxBodyLength: Infinity,
                Authorization: req.headers.authorization,
                Accept: req.headers.accept,      
                "Content-Type": "application/json"
            }
        }
        const data = await instance.get(URL, forwardHeader)
        return res.send(data.data).status()
    }catch(e){
        console.log(e)
        return res.send(e.data)       
    }
    
})


app.post('/',async function (req, res) {
    try{
        const URL = req.url.replace('/?url=','')    
        const token = Buffer.from(req.headers.authorization.split(' ')[1],'base64').toString().split(':')[1]
        const forwardHeader = {
            headers:{
                maxBodyLength: Infinity,
                Authorization: req.headers.authorization,
                Accept: req.headers.accept,      
                "Content-Type": "application/json"
            }
        }        
        const data = await instance.post(URL, req.body,forwardHeader)
        return res.status(data.status).send(data.data)
    }catch(e){
        console.log(e)
        console.log(e.response.data)
        return res.send(e.data)       
    }
    
})


app.listen(4001)