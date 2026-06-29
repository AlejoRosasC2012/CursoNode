const http = require('node:http')
const fs = require('node:fs')
const process = require('process')

const desiredPort = process.env.PORT ?? 3000

const procesRequest = (req, res) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')

  if (req.url === '/') {
    res.statusCode = 200

    // Presentación de la respuesta en html / Descomentar y jugar con el <h1> para verificar
    // res.setHeader('Content-Type', 'text/html; charset=utf-8')
    // res.end('<h1>Bienvenido a mi página de inicio</h1>')

    // Presentación de la respuesta en texto plano
    res.end('Bienvenido a mi página de inicio')
  } else if (req.url === '/contacto') {
    res.statusCode = 200

    res.end('Contacto')
  } else if (req.url === '/imagen.png') { // la extensión de la imagen en el header no es necesaria, pero es recomendable para que el navegador sepa cómo manejar el contenido
    res.statusCode = 200

    fs.readFile('./imagenTest.png', (err, data) => {
      if (err) {
        res.statusCode = 500
        res.end('500 Internal Server Error')
      } else {
        res.setHeader('Content-Type', 'image/png')
        res.end(data)
      }
    })
  } else {
    res.statusCode = 404
    res.end('Página no encontrada')
  }
}

const server = http.createServer(procesRequest)

server.listen(desiredPort, () => {
  console.log(`Server is listening on port http://localhost:${desiredPort}`)
})
