import express, { json } from 'express' // require -> commonJS
import { createMovieRouter } from './routes/routerMovie.js'
import { corsMiddleware } from './middlewares/cors.js'
import 'dotenv/config'

export const createApp = ({ movieModel }) => {
  const app = express()
  app.use(json())
  app.use(corsMiddleware())
  app.disable('x-powered-by')

  app.use('/movies', createMovieRouter({ movieModel }))

  const PORT = process.env.PORT ?? 3002

  app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
  })
}



