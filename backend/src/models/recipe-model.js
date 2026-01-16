import mongoose from 'mongoose'

// Esquema de receta
const recipeSchema = new mongoose.Schema({
  // Título de la receta
  title: {
    type: String,
    required: true
  },

  // Breve descripción
  description: {
    type: String,
    required: true
  },

  // Lista de ingredientes
  ingredients: {
    type: [String], // array de strings
    required: true
  },

  // Pasos de elaboración
  steps: {
    type: String,
    required: true
  },

  // Tiempo estimado en minutos
  time: {
    type: Number,
    required: true
  }
})

export default mongoose.model('Recipe', recipeSchema)
