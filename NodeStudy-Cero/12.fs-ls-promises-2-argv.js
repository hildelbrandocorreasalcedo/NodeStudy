// te dice el directorio ejecutandolo, pero si le mandas 2 argumentos, te muestra los archivos de ese directorio
// ejemplo: node 12.fs-ls-advand.js ./mjs

const fs = require('node:fs/promises')

const folder = process.argv[2] ?? '.'

fs.readdir(folder)
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