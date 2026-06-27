const fs = require('node:fs')

console.log('leyendo el primer archivo...')

fs.readFile('./archivo.txt', 'utf-8', (err, text) => { //Esta es la forma asincrona de leer los archivos, no requiere declarar la variable, trabaja como función flecha
    console.log('Primer texto: ',text)
})//Esto es un callback

console.log('-------------> Hacer cosas mientras lee el archivo')

console.log('Leyendo el segundo archivo...')
fs.readFile('./archivo2.txt', 'utf-8', (err, text) => { //Esta es la forma asincrona de leer los archivos, no requiere declarar la variable, trabaja como función flecha
    console.log('Segundo texto: ', text)
})