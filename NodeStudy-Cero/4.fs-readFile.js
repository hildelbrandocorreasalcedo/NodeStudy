// de manera Asincrona la lectura del archivo
// concepto los CallBack: son funciones que se ejecutan cuando una tarea a terminado

const fs = require('node:fs')

console.log('Leyendo el primer archivo')
fs.readFile('./archivo.txt', 'utf8', (err, text) => {  // <----- me ejecutas este callback
    console.log('Primer texto: ', text)
})

console.log('hacer cosas mientras lee el archivo...')

console.log('Leyendo el segundo archivo')
fs.readFile('./archivo2.txt', 'utf8', (err, text) => {  // <----- me ejecutas este callback
    console.log('Segundo texto: ', text)
})
