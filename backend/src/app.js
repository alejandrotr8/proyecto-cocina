import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

import authRoutes from './routes/auth-routes.js'
import recipeRoutes from './routes/recipe-routes.js'

const app = express()

// ---------- MIDDLEWARES GLOBALES ----------

// Permite peticiones desde frontend local y Vercel
app.use(cors())

// Logs HTTP (mejor que console.log)
app.use(morgan('dev'))

// Parseo de JSON
app.use(express.json())

// ---------- RUTAS ----------
app.use('/api/auth', authRoutes)
app.use('/api/recipes', recipeRoutes)

// ---------- 404 ----------
app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' })
})

// ---------- 500 ----------
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ message: 'Error interno del servidor' })
})

export default app
