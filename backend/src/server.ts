import express, { Express, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'

dotenv.config()

const app: Express = express()
const prisma = new PrismaClient()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Health Check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', timestamp: new Date() })
})

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Internal Server Error' })
})

// Import routes (will be created next)
// import authRoutes from './routes/auth'
// import cvRoutes from './routes/cv'
// app.use('/api/auth', authRoutes)
// app.use('/api/cv', cvRoutes)

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`)
  console.log(`📝 API available at http://localhost:${PORT}/api`)
})

// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect()
  process.exit(0)
})
