import app from './app.js'
import { connectDatabase } from './config/database.js'
import dotenv from 'dotenv'
dotenv.config()


const PORT = process.env.PORT || 4000

connectDatabase()

app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`)
})
