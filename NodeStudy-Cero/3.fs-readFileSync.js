// de manera Sincrona la lectura del archivo

const fs = require('node:fs')

console.log('Leyendo el primer archivo')
const read1 = fs.readFileSync('./archivo.txt', 'utf8')
console.log(read1)

console.log('hacer cosas mientras lee el archivo...')

console.log('Leyendo el segundo archivo')
const read2 = fs.readFileSync('./archivo.txt', 'utf8')
console.log(read2)