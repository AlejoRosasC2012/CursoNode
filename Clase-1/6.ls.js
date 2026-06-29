const fs = require('node:fs/promises')

fs.readdir('.')
    .then(files => {
        files.forEach(file => {
        console.log(file)
        })
    })
    .catch(err =>{
        if(err){ //Captura del error
            console.error('Error al leer el directorio:', err)
            return;
        }
    })
