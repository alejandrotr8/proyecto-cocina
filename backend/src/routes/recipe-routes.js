import express from 'express'
import {
  getRecipes,
  getRecipeById,
  createRecipe,
  deleteRecipe,
  updateRecipe
} from '../controllers/recipe-controller.js'


import { authenticate } from '../middlewares/auth-middleware.js'
import { authorizeAdmin } from '../middlewares/role-middleware.js'

const router = express.Router()

// Ver todas las recetas
router.get('/', authenticate, getRecipes)

// Ver una receta completa
router.get('/:id', authenticate, getRecipeById)

// Crear receta (ADMIN)
router.post('/', authenticate, authorizeAdmin, createRecipe)
// Editar receta (ADMIN)
router.put('/:id', authenticate, authorizeAdmin, updateRecipe)


// Eliminar receta (ADMIN)
router.delete('/:id', authenticate, authorizeAdmin, deleteRecipe)

export default router
