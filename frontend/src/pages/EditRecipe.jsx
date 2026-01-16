import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'

function EditRecipe() {
  const { auth } = useContext(AuthContext)
  const recipeId = window.location.pathname.split('/').pop()

  const [form, setForm] = useState({
    title: '',
    description: '',
    ingredients: '',
    steps: '',
    time: ''
  })

  // Cargar receta actual
  useEffect(() => {
    const fetchRecipe = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/recipes/${recipeId}`,
        {
          headers: { Authorization: `Bearer ${auth.token}` }
        }
      )

      setForm({
        title: res.data.title,
        description: res.data.description,
        ingredients: res.data.ingredients.join(', '),
        steps: res.data.steps,
        time: res.data.time
      })
    }

    fetchRecipe()
  }, [recipeId, auth.token])

  // Manejar cambios
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  // Guardar cambios
  const handleSubmit = async (e) => {
    e.preventDefault()

    await axios.put(
      `${import.meta.env.VITE_API_URL}/recipes/${recipeId}`,
      {
        ...form,
        ingredients: form.ingredients.split(',').map(i => i.trim())
      },
      {
        headers: { Authorization: `Bearer ${auth.token}` }
      }
    )

    window.location.href = `/recipes/${recipeId}`
  }

  return (
    <div className="container">
      <div className="card">
        <h1>Editar receta</h1>

        <form onSubmit={handleSubmit}>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Título"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Descripción"
          />

          <textarea
            name="ingredients"
            value={form.ingredients}
            onChange={handleChange}
            placeholder="Ingredientes (separados por coma)"
          />

          <textarea
            name="steps"
            value={form.steps}
            onChange={handleChange}
            placeholder="Elaboración"
          />

          <input
            type="number"
            name="time"
            value={form.time}
            onChange={handleChange}
            placeholder="Tiempo en minutos"
          />

          <button type="submit">Guardar cambios</button>
        </form>
      </div>
    </div>
  )
}

export default EditRecipe
