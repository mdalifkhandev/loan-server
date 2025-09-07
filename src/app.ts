import express, { type Request, type Response } from 'express'

const app = express()

app.use(express.json())

app.get('/',(req:Request,res:Response)=>{
    res.send('I am a Lone Server')
})


export default app