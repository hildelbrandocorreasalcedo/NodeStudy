// te dice el directorio y su informacion, opcional si le mandas 2 argumentos, te muestra los archivos de ese directorio
// ejemplo: node 12.fs-ls-advand.js ./mjs

const fs = require('node:fs/promises')
const path = require('node:path')
const color = require('picocolors')

const folder = process.argv[2] ?? '.'

async function ls (folder) {
    let files
    try {
        files = await fs.readdir(folder)
    } catch {
        console.error(color.red(`❌ No se pudo leer el directorio ${folder}`))
        process.exit(1)
    }

    const filesPromises = files.map(async file => {
        const filePath = path.join(folder, file)
        let stats

        try {
            stats = await fs.stat(filePath)  // status - informacion del archivo
        } catch {
            console.error(`No se puedo leer el rchivo ${filePath}`)
            process.exit(1)
        }


        const isDirectory = stats.isDirectory()
        const fileType = isDirectory ? 'd' : 'f'
        const fileSize = stats.size
        const fileModified = stats.mtime.toLocaleString()

        return `${color.bgMagenta(fileType)} ${color.blue(file.padEnd(30))} ${color.green(fileSize.toString().padStart(10))} ${color.yellow(fileModified)}`
    })
        
    const filesInfo = await Promise.all(filesPromises)
    
    filesInfo.forEach(filesInfo => console.log(filesInfo))
}

ls(folder)
