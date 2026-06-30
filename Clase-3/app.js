const express = require('express')
const cors = require('cors')
const movies = require('./movies.json')
const { validateMovie, validatePartialMovie } = require('./schemas/movie') // Importar la función de validación de películas desde el archivo 'validations.js'
const crypto = require('node:crypto') // Importar el módulo 'crypto' para generar IDs únicos

const app = express()

app.use(express.json()) // Middleware para parsear el body de las peticiones como JSON
app.use(cors({
  origin: (origin, callback) => {
    const ACCEPTED_ORIGINS = [
      'http://localhost:8080',
      'http://localhost:1234',
      'https://movies.com',
      'https://midu.dev'
    ]

    if (ACCEPTED_ORIGINS.includes(origin)) {
      return callback(null, true)
    }

    if (!origin) {
      return callback(null, true)
    }

    return callback(new Error('Not allowed by CORS'))
  }
}))
app.disable('x-powered-by') // Deshabilitar la cabecera 'X-Powered-By' para mayor seguridad

// API endpoint para traer las peliculas, buscar por titulo o genero
app.get('/movies', (req, res) => {
  const { genre, search } = req.query
  if(genre) {
   const filteredMovies = movies.filter(
    movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
   )
   return res.json(filteredMovies)
  }
  if(search) {
   const filteredMovies = movies.filter(
    movie => movie.title.toLowerCase().includes(search.toLowerCase())
   )
   return res.json(filteredMovies)
  }

  res.json(movies)
})

// API endpoint para traer una pelicula por id
app.get('/movies/:id', (req, res) => {
  const { id } = req.params
    const movie = movies.find(movie => movie.id === id)
    if (movie) {
      res.json(movie)
    } else {
      res.status(404).json({ error: 'Movie not found' })
    }
})


// API endpoint para crear una nueva pelicula
app.post('/movies', (req, res) => {
    
    const result = validateMovie(req.body)
    if (result.error) {
        return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { title, year, director, duration, poster, genre, rate } = req.body

    const newMovie = {
        id: crypto.randomUUID(), // Generar un ID único para la nueva película
        ...result.data // Usar los datos validados
    }
    movies.push(newMovie)
    res.status(201).json(newMovie)
})

app.delete('/movies/:id', (req, res) => {
    const { id } = req.params
    const movieIndex = movies.findIndex(movie => movie.id === id)

    if(movieIndex === -1){
        return res.status(404).json({message: 'movie not found'})
    }

    movies.splice(movieIndex, 1)
    return res.json({ message: 'movie deleted' })
})

app.patch('/movies/:id', (req, res) => {
    const result = validatePartialMovie(req.body)
    
    if (!result.success) {
        return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    
    const { id } = req.params
    const movieIndex = movies.findIndex(movie => movie.id === id)

    if (movieIndex === -1) {
        return res.status(404).json({ error: 'Movie not found' })
    }

    const updatedMovie = {
        ...movies[movieIndex],
        ...result.data // Usar los datos validados
    }

    movies[movieIndex] = updatedMovie
    return res.json(updatedMovie)
})


app.options('/movies/:id', (req, res) => {

    res.send(200)
})

const PORT = process.env.PORT ?? 1234   

app.listen(PORT, () => {
  console.log(`Server is listening on port http://localhost:${PORT}`)
})