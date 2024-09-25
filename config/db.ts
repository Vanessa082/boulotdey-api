import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config();

const connectToString: string = process.env.DB_STRING!;

const connectToDB = async() => {
  try {
    await mongoose.connect(connectToString, {
      autoIndex: true
    })
    console.log('DB connected to Atlas')
  } catch (error) {
    console.error(error)
  }
}

export default connectToDB