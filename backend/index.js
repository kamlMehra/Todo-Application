import dotenv from 'dotenv'

dotenv.config()

import route from './routes/Task.routes.js'

import ConnectDB from './DB/index.js' 

import bodyParser from 'body-parser'

import express from 'express'

import cors from "cors"

const app = express()

app.use(bodyParser.json())
app.use(cors({
    origin: "*",
}));

const port=process.env.PORT || 3000;

ConnectDB().then(()=>{
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })
})

app.use('/api/todo/',route)