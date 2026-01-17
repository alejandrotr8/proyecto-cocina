import mongoose from 'mongoose'

// Función que conecta la app con MongoDB
export const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI)
    console.log('Conectado a MongoDB')
  } catch (error) {
    console.error('Error conectando MongoDB', error)
    process.exit(1)
  }
}
