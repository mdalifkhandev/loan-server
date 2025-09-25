import express from 'express'
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import { Routers } from './app/router/index'
import notFound from './app/middleware/notFound'
import globalError from './app/middleware/globalError'

dotenv.config()

const app=express()

app.use(express.json())
// app.use(cors({
//     origin: '*',
//     credentials: true
// }))
app.use(cors({
  origin: (origin, callback) => {
    callback(null, origin || true);
  },
  credentials: true
}));


app.use(cookieParser())

app.use('/api/v1', Routers)

app.use(notFound)
app.use(globalError)

app.get('/',(req,res)=>{
    res.send('hello world')
})

export default app