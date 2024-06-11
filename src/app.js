import express from 'express';
import userAuth from './routes/auth.user.js'
import notesAuth from './routes/notes.auth.js'
import cors from 'cors'

const app=express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json());
app.use(express.urlencoded({extended:true}))


app.use('/api/auth',userAuth)
app.use('/api/notes',notesAuth)

export {app}