// ls con callback
// muestra todos los directorios y archivos de la ubicacion actual

const fs = require('node:fs')

fs.readdir('.', (err, files) =>{
    if(err){
        console.log('Error en el directorio: ', err)
        return;
    }

    files.forEach(file => {
        console.log(file)
    })
})