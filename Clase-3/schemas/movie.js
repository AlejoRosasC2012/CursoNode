const { z } = require('zod') // Importar la librería 'zod' para validación de datos

const movieSchema = z.object({
  title: z.string(),
  year: z.number().int().min(1888).max(2026), // El año debe ser un número entero mayor o igual a 1888
  director: z.string(),
  duration: z.number().int().min(1), // La duración debe ser un número entero mayor o igual a 1
  poster: z.string().url(), // La URL del póster debe ser una cadena de texto válida
  genre: z.array(
    z.enum([
      'Action',
      'Adventure',
      'Biography',
      'Drama',
      'Comedy',
      'Fantasy',
      'Sci-Fi',
      'Thriller',
      'Horror'
    ])
  ), // El género debe ser un arreglo de cadenas de texto
  rate: z.number().min(0).max(10).optional() // La calificación es opcional y debe estar entre 0 y 10
})

function validateMovie (movie) {
  return movieSchema.safeParse(movie)
}

function validatePartialMovie (movie) {
  return movieSchema.partial().safeParse(movie)
}

module.exports = {
  validateMovie,
  validatePartialMovie
}
