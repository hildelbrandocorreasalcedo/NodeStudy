const express = require('express')
const app = express()
const dittoJson = require('./pokemon/ditton.json')

const port = process.env.PORT ?? 3200

// Middleware de express
app.use(express.json())


// Middleware nativo de node
app.use((req, res, next) =>{
  console.log('Paso por el Middleware')
  next()
})

app.get('/', (req, res) => {
  res.send('<h1>Hola mundo</h1>')
})

app.get('/pokemon/ditto', (req, res) => {
  res.json(dittoJson)
})

app.post('/pokemon', (req, res) => {
  let body = ''

  // escuchar el evento data
  req.on('data', chunk => {
    body += chunk.toString()
  })

  req.on('end', () =>{
    const data = JSON.parse(body)
    data.timestamp = Date.now()
    res.status(201).json(data)
  })
})

app.use((req, res) => {
  res.status(404).send('<h1>404</h1>')
})

// va al final de todos los metodos
app.listen(port, () =>{
  console.log(`Server corriendo en el puerto http://localhost:${port}`);
});


