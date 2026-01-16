import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'

function Recipes() {
  const { auth, logout } = useContext(AuthContext)

  const [recipes, setRecipes] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [error, setError] = useState(null)

  // Función para obtener recetas
  const fetchRecipes = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/recipes`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}` 
          }
        }
      )
      setRecipes(response.data)
      setError(null)
    } catch (err) {
      setError('No se pueden mostrar las recetas')
    }
  }

  // Cargar recetas al entrar
  useEffect(() => {
    if (auth.token) {
      fetchRecipes()
    }
  }, [auth.token])

  // Crear receta (ADMIN)
  const createRecipe = async () => {
    if (!newTitle) return

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/recipes`,
        { title: newTitle },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`
          }
        }
      )
      setNewTitle('')
      fetchRecipes()
    } catch {
      alert('No autorizado para crear recetas')
    }
  }

  // DELETE necesita headers como SEGUNDO parámetro
  const deleteRecipe = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/recipes/${id}`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`
          }
        }
      )
      fetchRecipes()
    } catch {
      alert('No autorizado para eliminar recetas')
    }
  }

  return (
  <div className="container">
    <div className="card">
      <h1>🍽️ Recetas</h1>

      <p>
        Rol actual: <strong>{auth.role}</strong>
      </p>

      <button className="secondary" onClick={logout}>
        Cerrar sesión
      </button>
    </div>

    {auth.role === 'ADMIN' && (
      <div className="card">
        <h2>Crear nueva receta</h2>

        <input
          placeholder="Título de la receta"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />

        <button onClick={createRecipe}>Crear receta</button>
      </div>
    )}

    {error && (
      <div className="card">
        <p style={{ color: 'red' }}>{error}</p>
      </div>
    )}

    <div className="card">
      <h2>Listado</h2>

      <ul className="recipe-list">
        {recipes.map((recipe) => (
          <li key={recipe._id} className="recipe-item">
            <strong>{recipe.title}</strong>

            <div className="recipe-actions">
                <button onClick={() => window.location.href = `/recipes/${recipe._id}`}>
                    Ver receta
                </button>

                {auth.role === 'ADMIN' && (
                    <>
                    <button onClick={() => window.location.href = `/recipes/edit/${recipe._id}`}>
                        Editar
                    </button>

                    <button
                        className="secondary"
                        onClick={() => deleteRecipe(recipe._id)}
                    >
                        Eliminar
                    </button>
    </>
  )}
</div>

          </li>
        ))}
      </ul>
    </div>
  </div>
)

}

export default Recipes
