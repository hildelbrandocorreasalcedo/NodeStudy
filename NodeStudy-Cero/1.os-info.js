// modulos nativos de node
// informacion del sistema operativo con commonjs

// opciones de importacion de modulos
// import { platform, release, arch, cpus, freemem, totalmem, uptime } from 'node:os'
//import os from 'node:os'
const os = require('node:os')

console.log('informacion del sistema operativo')
console.log('---------------------------------')

console.log('Nombre del sistema operativo: ', os.platform())
console.log('version del sistema opertivo: ', os.release())
console.log('Arquitectura: ', os.arch())
console.log('CPUs: ', os.cpus())
console.log('Memoria libre: ', os.freemem() / 1024 / 1024)
console.log('Memoria Total: ', os.totalmem() / 1024 / 1024)
console.log('Cuanto horas lleva encendido el pc: ', os.uptime() / 60 / 60) // lo da en hora