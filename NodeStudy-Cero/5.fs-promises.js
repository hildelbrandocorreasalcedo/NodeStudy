// de manera Asincrona la lectura del archivo utilizando promesas

const fs = require('node:fs/promises')

console.log('Leyendo el primer archivo')
fs.readFile('./archivo.txt', 'utf8')
    .then(text => {
        console.log('Primer texto: ', text)
    })

console.log('hacer cosas mientras lee el archivo...')

console.log('Leyendo el segundo archivo')
fs.readFile('./archivo2.txt', 'utf8')
    .then(text => {
        console.log('Segundo texto: ', text)
    })