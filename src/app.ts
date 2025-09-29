import express, { Request, Response } from 'express'
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import { Routers } from './app/router/index'
import notFound from './app/middleware/notFound'
import globalError from './app/middleware/globalError'

dotenv.config()

const app = express()

app.use(express.json())
const allowedOrigins = ['http://localhost:3000', 'http://127.0.0.1:3000', 'https://lone-clain.vercel.app', 'https://lone-frontend.vercel.app'];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));


app.use(cookieParser())

app.use('/api/v1', Routers)

app.use(notFound)
app.use(globalError)

app.get('/', (req:Request, res:Response) => {
  res.send('hello world')
})

export default app