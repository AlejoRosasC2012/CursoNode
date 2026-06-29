/// importe de modulos de Node

const fs = require('node:fs/promises')
const path = require('node:path')
const pcc = require('picocolors')
const folder = process.argv[2] ?? '.'

async function ls (folder){
    
    //Ejecución sincrona que espera a la finalización del proceso de revición del directorio
    
    let files
    try{
        files = await fs.readdir(folder)
    }catch {
        console.error(pcc.red(`No se puedo leer el directorio: ${folder}`))
        process.exit(1)
    }   
    
    //Ejecución en Paralelo de construcción de los objetos

    const filesPromises = files.map(async file => { //construcción del objeto files promises
        const filePath = path.join(folder, file)
        let stats
        try{
            stats = await fs.stat(filePath) //captura de información del archivo ver el archivo 2.fs-stat.js para recordar
        }catch{
            console.error(`No se puedo leer el archivo: ${filePath}`)
            process.exit(1)
        }

        const isDirectory = stats.isDirectory()
        const fileType = isDirectory ? 'd' : 'f'
        const fileSize = stats.size.toString()
        const fileModified = stats.mtime.toLocaleString()

        return `${pcc.whiteBright(fileType.padEnd(5))} ${pcc.green(file.padEnd(20))} ${pcc.blueBright(fileSize.padEnd(10))} ${pcc.magenta(fileModified)}` //entrega del objeto
    })

    const filesInfo = await Promise.all(filesPromises)// asignación del objeto a la función para retornarlo
    filesInfo.forEach(fileInfo => console.log(fileInfo))
}
let TipoArchivo = 'Type'
let NombreArchivo = 'Name'
let tamano = 'Size'
let ultimaMod = 'Last Modified'

console.log(`${pcc.whiteBright(TipoArchivo.padEnd(5))} ${pcc.green(NombreArchivo.padEnd(20))} ${pcc.blueBright(tamano.padEnd(10))} ${pcc.magenta(ultimaMod)}`) //entrega del objeto
ls(folder)