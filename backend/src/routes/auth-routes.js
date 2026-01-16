import { Router } from 'express'
import { login, register } from '../controllers/auth-controller.js'


const router = Router()


router.post('/login', login) // Endpoint login
router.post('/register', register) // Endpoint registro


export default router