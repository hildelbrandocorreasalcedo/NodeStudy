import express, { json } from 'express' // require -> commonJS
import { moviesRouter } from './routes/routerMovie.js'
import { corsMiddleware } from './middlewares/cors.js'

const app = express()
app.use(json())
app.disable('x-powered-by')

app.use('/movies', moviesRouter)

const PORT = process.env.PORT ?? 3002

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})