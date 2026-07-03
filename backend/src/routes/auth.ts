import express, { Router, Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

const router = Router()
const prisma = new PrismaClient()

interface AuthRequest extends Request {
  body: {
    email: string
    password: string
    name?: string
  }
}

// Register
router.post('/register', async (req: AuthRequest, res: Response) => {
  try {
    const { email, password, name } = req.body

    if (!email || !password || !name) {
      return res.status(400).json({ message: 'Tous les champs sont requis' })
    }

    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return res.status(409).json({ message: 'Cet email est déjà utilisé' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    })

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    )

    res.status(201).json({
      user: { id: user.id, email: user.email, name: user.name },
      token,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Erreur lors de l\'inscription' })
  }
})

// Login
router.post('/login', async (req: AuthRequest, res: Response) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Email et mot de passe requis' })
    }

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return res.status(401).json({ message: 'Identifiants invalides' })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Identifiants invalides' })
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    )

    res.json({
      user: { id: user.id, email: user.email, name: user.name },
      token,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Erreur lors de la connexion' })
  }
})

// Verify Token
router.post('/verify', async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      return res.status(401).json({ message: 'Token manquant' })
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'your-secret-key'
    )

    const user = await prisma.user.findUnique({
      where: { id: (decoded as any).userId },
    })

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' })
    }

    res.json({
      user: { id: user.id, email: user.email, name: user.name },
      valid: true,
    })
  } catch (error) {
    res.status(401).json({ message: 'Token invalide' })
  }
})

export default router
