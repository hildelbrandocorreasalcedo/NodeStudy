// muestra todos los directorios y archivos de la ubicacion actual

const fs = require('node:fs/promises')

fs.readdir('.')
    .then(files => {
        files.forEach(file => {
            console.log(file)
        })
    })
    .catch(err => {
        if(err) {
            console.log('Error en el directorio: ', err)
            return;
        }
    }) 