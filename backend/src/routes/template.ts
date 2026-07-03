import express, { Router, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const router = Router()
const prisma = new PrismaClient()

// Get all templates
router.get('/', async (req: Request, res: Response) => {
  try {
    const templates = await prisma.cVTemplate.findMany({
      where: { isActive: true },
    })
    res.json(templates)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Erreur lors de la récupération des templates' })
  }
})

// Get a specific template
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const template = await prisma.cVTemplate.findUnique({ where: { id } })

    if (!template) {
      return res.status(404).json({ message: 'Template non trouvé' })
    }

    res.json(template)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Erreur lors de la récupération du template' })
  }
})

export default router
