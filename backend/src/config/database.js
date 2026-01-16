import mongoose from 'mongoose'

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI)
    console.log('MongoDB conectado correctamente')
  } catch (error) {
    console.error('Error conectando MongoDB', error)
    process.exit(1)
  }
}

export default connectDatabase
