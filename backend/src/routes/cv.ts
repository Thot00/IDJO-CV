import express, { Router, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { authMiddleware } from '../middleware/auth'
import { v4 as uuidv4 } from 'uuid'

const router = Router()
const prisma = new PrismaClient()

interface AuthRequest extends Request {
  userId?: string
}

// Get all CVs for the current user
router.get('/my-cvs', authMiddleware as any, async (req: AuthRequest, res: Response) => {
  try {
    const cvs = await prisma.cV.findMany({
      where: { userId: req.userId },
      orderBy: { updatedAt: 'desc' },
    })
    res.json(cvs)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Erreur lors de la récupération des CV' })
  }
})

// Get a specific CV
router.get('/:id', authMiddleware as any, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params
    const cv = await prisma.cV.findUnique({ where: { id } })

    if (!cv) {
      return res.status(404).json({ message: 'CV non trouvé' })
    }

    if (cv.userId !== req.userId && !cv.isPublic) {
      return res.status(403).json({ message: 'Accès refusé' })
    }

    res.json(cv)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Erreur lors de la récupération du CV' })
  }
})

// Create a new CV
router.post('/create', authMiddleware as any, async (req: AuthRequest, res: Response) => {
  try {
    const { title, template } = req.body

    const cv = await prisma.cV.create({
      data: {
        id: uuidv4(),
        userId: req.userId!,
        title: title || 'Mon CV',
        template: template || 'modern',
        data: {},
      },
    })

    res.status(201).json(cv)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Erreur lors de la création du CV' })
  }
})

// Update CV
router.put('/:id', authMiddleware as any, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params
    const { title, template, data, isPublic } = req.body

    const cv = await prisma.cV.findUnique({ where: { id } })
    if (!cv) {
      return res.status(404).json({ message: 'CV non trouvé' })
    }

    if (cv.userId !== req.userId) {
      return res.status(403).json({ message: 'Accès refusé' })
    }

    const updatedCV = await prisma.cV.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(template && { template }),
        ...(data && { data }),
        ...(isPublic !== undefined && { isPublic }),
      },
    })

    res.json(updatedCV)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Erreur lors de la mise à jour du CV' })
  }
})

// Delete CV
router.delete('/:id', authMiddleware as any, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params

    const cv = await prisma.cV.findUnique({ where: { id } })
    if (!cv) {
      return res.status(404).json({ message: 'CV non trouvé' })
    }

    if (cv.userId !== req.userId) {
      return res.status(403).json({ message: 'Accès refusé' })
    }

    await prisma.cV.delete({ where: { id } })

    res.json({ message: 'CV supprimé avec succès' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Erreur lors de la suppression du CV' })
  }
})

// Export CV as PDF (placeholder)
router.get('/:id/export-pdf', authMiddleware as any, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params

    const cv = await prisma.cV.findUnique({ where: { id } })
    if (!cv) {
      return res.status(404).json({ message: 'CV non trouvé' })
    }

    if (cv.userId !== req.userId && !cv.isPublic) {
      return res.status(403).json({ message: 'Accès refusé' })
    }

    // TODO: Implement PDF generation
    res.json({ message: 'Fonctionnalité d\'export PDF à venir' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Erreur lors de l\'export du CV' })
  }
})

export default router
