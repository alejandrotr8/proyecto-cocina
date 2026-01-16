import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'

function RecipeDetail() {
  const { auth } = useContext(AuthContext)
  const [recipe, setRecipe] = useState(null)

  // Obtenemos el ID desde la URL
  const recipeId = window.location.pathname.split('/').pop()

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/recipes/${recipeId}`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`
            }
          }
        )
        setRecipe(response.data)
      } catch (error) {
        console.error('Error cargando receta')
      }
    }

    fetchRecipe()
  }, [recipeId, auth.token])

  if (!recipe) {
    return <p>Cargando receta...</p>
  }

  return (
  <div className="container">
    <div className="card">
      <h1>{recipe.title}</h1>

      <p>
        <strong>Descripción:</strong> {recipe.description}
      </p>

      <p>
        <strong>Tiempo:</strong> {recipe.time} minutos
      </p>
    </div>

    <div className="card">
      <h3>Ingredientes</h3>
      <ul className="ingredients">
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
    </div>

    <div className="card">
      <h3>Elaboración</h3>
      <p>{recipe.steps}</p>
    </div>

    <button className="secondary" onClick={() => window.history.back()}>
      Volver
    </button>
  </div>
)

}

export default RecipeDetail
