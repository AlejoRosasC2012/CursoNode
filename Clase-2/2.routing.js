const http = require('node:http')
const dittoJSON = require('./pokemon/ditto.json')

const processRequest = (req, res) => {
  const { method, url } = req

  switch (method) {
    case 'GET':
      switch (url) {
        case '/pokemon/ditto':
          res.setHeader('Content-Type', 'application/json')
          return res.end(JSON.stringify(dittoJSON))

        default:
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          return res.end('<h1>404 Página no encontrada</h1>')
      }
    case 'POST':
      switch (url) {
        case '/pokemon':{
          let body = ''
          // Escuchar el evento 'data' para recibir los datos del cuerpo de la solicitud
          req.on('data', (chunk) => {
            body += chunk.toString()
          })
          // Escuchar el evento 'end' para procesar los datos recibidos
          req.on('end', () => {
            const data = JSON.parse(body) // Convertir el cuerpo de la solicitud a un objeto JavaScript
            res.writeHead(201, { 'Content-Type': 'application/json; charset=utf-8' })
            data.timestamp = Date.now() // Agregar un timestamp al objeto de datos
            res.end(JSON.stringify(data))
          })

          break
        }

        default:
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          return res.end('<h1>404 Página no encontrada</h1>')
      }
  }
}

const server = http.createServer(processRequest)

server.listen(1234, () => {
  console.log('Server is listening on port http://localhost:1234')
})
