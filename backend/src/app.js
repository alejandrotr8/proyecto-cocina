import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import connectDatabase from './config/database.js'
import authRoutes from './routes/auth-routes.js'
import recipeRoutes from './routes/recipe-routes.js'
import notFoundMiddleware from './middlewares/not-found-middleware.js'
import errorMiddleware from './middlewares/error-middleware.js'


// Inicializa Express
const app = express()


// Conecta a MongoDB
connectDatabase()


// Middlewares globales
app.use(cors()) // Permite solicitudes de otros dominios
app.use(helmet()) // Añade cabeceras de seguridad
app.use(morgan('dev')) // Loguea peticiones HTTP
app.use(express.json()) // Parsear JSON


// Rutas
app.use('/api/auth', authRoutes) // Login y registro
app.use('/api/recipes', recipeRoutes) // CRUD de recetas


// Middlewares de error
app.use(notFoundMiddleware) // 404
app.use(errorMiddleware) // 500


export default app