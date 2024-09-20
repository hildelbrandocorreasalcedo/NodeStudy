const path = require('node:path')

// te da el separador que utiliza el sistema operativo
console.log(path.sep)

// te concatena el directoio, los une
const filePath = path.join('content', 'files', 'test.txt')
console.log(filePath)

// te da el nombre del archivo
const base = path.basename('/tmp/content/file/test.txt')
console.log(base)

// te da el nombre del archivo, pero sin su extencion
const filename = path.basename('/tmp/content/file/test.txt', '.txt')
console.log(filename)

// te da la extencion del archivo
const extension = path.extname('/tmp/test.png')
console.log(extension)
