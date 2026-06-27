const fs = require('node:fs') //modulo de archivos fs = Files-system

const stats = fs.statSync('./archivo.txt') //recuperar información del archivo


console.log(
    stats.isFile(),
    stats.isDirectory(),
    stats.isSymbolicLink(),
    stats.size,
)
