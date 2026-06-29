const express = require('express')
const dittoJSON = require('./pokemon/ditto.json')
const app = express()

app.disable('x-powered-by') // Deshabilitar la cabecera 'X-Powered-By' para mayor seguridad

const PORT = process.env.PORT || 1234

// Middeleware
app.use((req, res, next) => {
  if (req.method !== 'POST') return next() // Si el método no es POST, pasar al siguiente middleware
  if (req.headers['content-type'] !== 'application/json') return next() // Si el tipo de contenido no es JSON, pasar al siguiente middleware

  // Solo procesar solicitudes POST con tipo de contenido 'application/json'
  let body = ''
  // Escuchar el evento 'data' para recibir los datos del cuerpo de la solicitud
  // Esta funcion se encarga de obtener TODA la info del body de la petición
  req.on('data', (chunk) => {
    body += chunk.toString()
  })
  // Escuchar el evento 'end' para procesar los datos recibidos
  // Esta funcion se encarga de parsear la info del body de la petición
  // y solo se ejecuta cuando se terminó de recibir la información del body
  req.on('end', () => {
    const data = JSON.parse(body) // Convertir el cuerpo de la solicitud a un objeto JavaScript
    data.timestamp = Date.now() // Agregar un timestamp al objeto de datos
    req.body = data // Guardar el objeto de datos en la propiedad 'body' del objeto 'req'
    // la linea anterior es objetivo final de este middeleware,
    // ya que permite que la información del cuerpo de
    // la solicitud esté disponible para las rutas posteriores.
    next() // Llamar a la siguiente función de middleware
  })
})

// La forma nativa de express para hacer la captura del body es con la función express.json(), que es un middleware incorporado en Express.
// app.use(express.json()) // Middleware para parsear el cuerpo de las solicitudes en formato JSON

// Peticiones GET
app.get('/pokemon/ditto', (req, res) => {
  res.json(dittoJSON)
})

// Peticiones POST
app.post('/pokemon', (req, res) => {
  res.status(201).json(req.body) // Enviar la respuesta con el objeto de datos en formato JSON
})

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).send('<h1>404 Página no encontrada</h1>')
})

app.listen(PORT, () => {
  console.log(`Server is listening on port http://localhost:${PORT}`)
})
