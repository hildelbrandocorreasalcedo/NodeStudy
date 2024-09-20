// que significa 'fs' es el sistema de archivos del sistema operativo
// file sytem
// node tiene monohilos y solo tiene un proceso, pero se ejecuta en eventos, por lo que puede utilizar asyncrono, ejecutando la arquitectura de eventos donde ejecutara varios eventos

const fs = require('node:fs') // apartir de node 16 se recoienda poner el node:

const stats = fs.statSync('./archivo.txt')
console.log(
    'si es un fichero: ', stats.isFile(), // si es un fichero
    'si es un directorio: ', stats.isDirectory(), // si es un directorio
    'si es un enlace simbolico: ',  stats.isSymbolicLink(), // si es un enlace simbolico
    'Cuanto es el tamño en bit:', stats.size,
)