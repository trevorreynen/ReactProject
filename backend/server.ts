import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import cors from 'cors'

import { sequelize } from './config/database'

import recipesRouter from './routes/recipes'
import ingredientsRouter from './routes/ingredients'
import nutritionRoutes from './routes/nutritionfact'



dotenv.config({ path: path.resolve(__dirname, '../../.env') })

const app = express()
const PORT = parseInt(process.env.BACKEND_PORT!)

const allowedOrigins = [
  `http://localhost:${process.env.FRONTEND_PORT}`,
  `http://192.168.1.113:${process.env.FRONTEND_PORT}`,
]


app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
}))


// Middleware to parse JSON bodies
app.use(express.json())


// Define API routes
app.use('/api/recipes', recipesRouter)
app.use('/api/ingredients', ingredientsRouter)
app.use('/api/nutritionfact', nutritionRoutes)

app.get('/', (req, res) => {
  res.send('API is running')
})


// Sync the database and start the server
sequelize
  .sync({ alter: true }) // use alter:true in development to auto-update tables
  .then(() => {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running at http://localhost:${PORT} and available on your LAN`)
    })
  })
  .catch((error) => {
    console.error('Database connection failed:', error)
  })




