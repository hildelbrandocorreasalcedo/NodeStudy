// de manera Asincrona secuencial la lectura del archivo utilizando async-await
const { readFile } = require('node:fs/promises');


async function main() {
    console.log('Leyendo el primer archivo')
    const text1 = await readFile('./archivo.txt', 'utf8')
    console.log('Primer texto: ', text1)


    console.log('hacer cosas mientras lee el archivo...')


    console.log('Leyendo el segundo archivo')
    const text2 = await readFile('./archivo2.txt', 'utf8')
    console.log('Segundo texto: ', text2)
}

main()