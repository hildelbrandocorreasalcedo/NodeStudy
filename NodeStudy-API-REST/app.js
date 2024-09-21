const express = require('express') // esta es la utilizcion del commonjs
const crypto = require('node:crypto')
const cors = require('cors')

const movies = require('./movies.json')
const { validateMovie, validaParcialMovie } = require('./schemas/movies')

const app = express()
app.disable('x-powered-by') // est para desabilitar en la cabezera el nombre de Express


//Middelwer
app.use(express.json())
app.use(cors({
    origin: (origin, callback) => {
        const ACCETEPED_ORIGINS = [
            'http://localhost:8080',
            'http://localhost:3002',
            'http://127.0.0.1:5500',
            'http://movies.com'
        ] 

        if(ACCETEPED_ORIGINS.includes(origin)){
            return callback(null, true)
        }

        if(!origin) {
            return callback(null, true)
        }

        return callback(new Error('Not alloweb by CORS'))
    }
}))



// inicio de la pagina de peliculas
app.get('/', (req, res) => {
  res.json({ messenge: 'Hola mundo' })
})


// Mostrar todas las peliculas
app.get('/movies', (req, res) => {
    res.json(movies)
})


// buscar por id la pelicula
app.get('/movies/:id', (req, res) => {  // es un segmento dinamico el ":id" donde es un parametro
  const { id } = req.params
  const movie = movies.find(movie => movie.id === id)
  if(movie) return res.json(movie)
    res.status(404).json({messenge: 'Movie Not Found'})
})


// filtrar por genero de pelicula
app.get('/movies', (req, res) => {
    const { genre } = req.query
    if(genre){
        const filteredMovies = movies.filter(
            movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
        )
        return res.json(filteredMovies)
    }
    res.json(movies)
})


// Creacion de una pelicula
app.post('/movies', (req, res) => {

    const result = validateMovie(req.body)

    if(!result.success){
        return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    // en base de datos
    const newMovies = {
        id: crypto.randomUUID(), // indentificador unico universal eso es el UUID
        ...result.data
    }

    // estos no es REST, porque estamos guardando
    // el estado de la aplicacion en memoria
    movies.push(newMovies)

    res.status(201).json(newMovies) //actualiza la cache del cliente
})


// actualiar una pelicula
app.patch('/movies/:id', (req, res) =>{
    const result = validaParcialMovie(req.body)

    if(!result.success){
        return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params
    const movieIndex = movies.findIndex(movie => movie.id === id)

    if(movieIndex === -1){
        return res.status(404).json({message: 'Movie not found'})
    } 

    // aqui estamos actualizando en el archivo que luego sera en base de datos
    const updateMovie = {
        ...movies[movieIndex],
        ...result.data
    }

    movies[movieIndex] = updateMovie
    return res.json(updateMovie)
})


// Eliminar una película
app.delete('/movies/:id', (req, res) => {  // Cambiado de '/products/:id' a '/movies/:id'
    const { id } = req.params;
    const movieIndex = movies.findIndex(movie => movie.id === id);
  
    if (movieIndex === -1) {
      return res.status(404).json({ message: 'Movie not found' });
    }
  
    movies.splice(movieIndex, 1);
  
    return res.json({ message: 'Movie deleted' });
});



const PORT = process.env.PORT ?? 3002

app.listen( PORT, () =>{
    console.log(`Server lintening o port http://localhost:${PORT}`);
})