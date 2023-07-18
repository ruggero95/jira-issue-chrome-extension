const express = require('express')
const app = express()
const axios = require('axios')
const cors = require('cors')
const https = require('https') 

app.use(cors({
    origin: '*',    
}));
const instance = axios.create({
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    }), 
})
app.get('/', function (req, res) {
    const URL = req.url.replace('/?url=','')
    console.log(URL)
    console.log(req.headers)

    try{
        const data = instance.get(URL, {headers:{...req.headers},})
        return res.send(data)
    }catch(e){
        return res.send(e.data.message)       
    }
    
})

app.listen(4001)