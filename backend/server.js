import express from 'express'
import dotenv from 'dotenv'
import directRoute from './routes/directRoute.js'
import connectDB from './db/connectDB.js'


dotenv.config()

const port = process.env.PORT || 8700

const app = express()

app.use(express.json())

app.use('/', directRoute)

app.listen(port, async () => {
   try {
    await connectDB()
    console.log(`Listening to PORT: ${port}`)
   } catch (error) {
    console.log(`Error in Listening: ${error}`)
   }
})



