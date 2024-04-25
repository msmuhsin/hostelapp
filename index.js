import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import studentRoutes from './routes/student.js'
import userRoutes from './routes/user.js'
dotenv.config()

const app = express()

app.use(cors())

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to DB')
  })
  .catch((err) => {
    console.log(err)
  })

app.use(express.json())

app.use('/student', studentRoutes)
app.use('/user', userRoutes)

app.get('/', (req, res) => {
  res.send('helloworld')
})

const Port = process.env.PORT || 3000

app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`)
})
