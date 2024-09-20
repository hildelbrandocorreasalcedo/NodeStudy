// de manera Asincrona paralelo, osea al mismo tiempo, la lectura del archivo
import { readFile } from 'node:fs/promises'

Promise.all([
    readFile('./archivo.txt', 'utf8'),
    readFile('./archivo2.txt', 'utf8')
]).then(([text1, text2])=> {
console.log('Primer texto: ', text1)
console.log('Segundo texto: ', text2)
})


console.log('hacer cosas mientras lee el archivo...')
