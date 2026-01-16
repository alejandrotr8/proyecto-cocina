import Recipe from '../models/recipe-model.js'

// Obtener todas las recetas (USER y ADMIN)
export const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find()
    res.status(200).json(recipes)
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo recetas' })
  }
}

// Obtener una receta por ID (ver receta completa)
export const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id)

    if (!recipe) {
      return res.status(404).json({ message: 'Receta no encontrada' })
    }

    res.status(200).json(recipe)
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo receta' })
  }
}

// Crear receta (solo ADMIN)
export const createRecipe = async (req, res) => {
  try {
    const { title, description, ingredients, steps, time } = req.body

    // Validación
    if (!title || !description || !ingredients || !steps || !time) {
      return res.status(400).json({ message: 'Datos incompletos' })
    }

    const recipe = new Recipe({
      title,
      description,
      ingredients,
      steps,
      time
    })

    await recipe.save()

    res.status(201).json(recipe)
  } catch (error) {
    res.status(500).json({ message: 'Error creando receta' })
  }
}

// Eliminar receta (solo ADMIN)
export const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id)

    if (!recipe) {
      return res.status(404).json({ message: 'Receta no encontrada' })
    }

    res.status(200).json({ message: 'Receta eliminada correctamente' })
  } catch (error) {
    res.status(500).json({ message: 'Error eliminando receta' })
  }
}
// Editar receta (solo ADMIN)
export const updateRecipe = async (req, res) => {
  try {
    const { title, description, ingredients, steps, time } = req.body

    // Validación básica
    if (!title || !description || !ingredients || !steps || !time) {
      return res.status(400).json({ message: 'Datos incompletos' })
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        ingredients,
        steps,
        time
      },
      { new: true } // devuelve la receta actualizada
    )

    if (!updatedRecipe) {
      return res.status(404).json({ message: 'Receta no encontrada' })
    }

    res.status(200).json(updatedRecipe)
  } catch (error) {
    res.status(500).json({ message: 'Error actualizando receta' })
  }
}

