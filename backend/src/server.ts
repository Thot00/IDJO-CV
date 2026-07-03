import express, { Express, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'

// Import routes
import authRoutes from './routes/auth'
import cvRoutes from './routes/cv'
import templateRoutes from './routes/template'
import jokeRoutes from './routes/joke'

dotenv.config()

const app: Express = express()
const prisma = new PrismaClient()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Request logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.path}`)
  next()
})

// Health Check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', timestamp: new Date() })
})

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/cv', cvRoutes)
app.use('/api/templates', templateRoutes)
app.use('/api/jokes', jokeRoutes)

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Route not found' })
})

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack)
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' })
})

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`)
  console.log(`📝 API available at http://localhost:${PORT}/api`)
  console.log(`🕐 Clock available at http://localhost:${PORT}/api/clock`)
  console.log(`😂 Jokes available at http://localhost:${PORT}/api/jokes`)
})

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down...')
  await prisma.$disconnect()
  process.exit(0)
})

export default app
