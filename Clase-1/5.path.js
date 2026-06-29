const path = require('node:path')

//barra separadora de carpetas según el sistema operativo
console.log(path.sep)

//unir rutas con path
const filePath = path.join('content','subfolder','test.txt')
console.log(filePath)

const base = path.basename('/tmp/usuario/archivotest.txt')//basename retorna el nombre del archivo junto con su tipo
console.log(base)

const fileName = path.basename('/tmp/usuario/archivotest.txt', '.txt')
console.log(fileName)

const extension = path.extname('archivoFalso.jpeg')
console.log(extension)