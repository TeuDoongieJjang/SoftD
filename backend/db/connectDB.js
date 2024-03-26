import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const dbURL = process.env.MONGO_DB_URL

const connectDB = async () => {
    try {
        await mongoose.connect(dbURL)
        console.log(`Connected to MongoDB`)
    } catch (error) {
        console.log(`Error Connection MongoDB: ${error}`)
    }
}

export default connectDB