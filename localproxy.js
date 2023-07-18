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
        return res.send(data.data)
    }catch(e){
        console.log(e)
        return res.send(e.data)       
    }
    
})

app.listen(4001)