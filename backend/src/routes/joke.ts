import express, { Router, Request, Response } from 'express'
import axios from 'axios'

const router = Router()

interface JokeResponse {
  type: string
  setup?: string
  delivery?: string
  joke?: string
  error?: boolean
}

// Get a random joke
router.get('/random', async (req: Request, res: Response) => {
  try {
    const response = await axios.get<JokeResponse>('https://v2.jokeapi.dev/joke/Any')
    const joke = response.data

    if (joke.type === 'twopart') {
      res.json({
        joke: `${joke.setup}\n\n${joke.delivery}`,
        type: 'twopart',
        setup: joke.setup,
        delivery: joke.delivery,
      })
    } else {
      res.json({
        joke: joke.joke,
        type: 'single',
      })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Erreur lors de la récupération de la blague' })
  }
})

// Get a joke by category
router.get('/category/:category', async (req: Request, res: Response) => {
  try {
    const { category } = req.params
    const validCategories = ['General', 'Knock-Knock', 'Programming', 'Miscellaneous']

    if (!validCategories.includes(category)) {
      return res.status(400).json({
        message: `Catégorie invalide. Valides: ${validCategories.join(', ')}`,
      })
    }

    const response = await axios.get<JokeResponse>(
      `https://v2.jokeapi.dev/joke/${category}`
    )
    const joke = response.data

    if (joke.type === 'twopart') {
      res.json({
        joke: `${joke.setup}\n\n${joke.delivery}`,
        type: 'twopart',
        setup: joke.setup,
        delivery: joke.delivery,
        category,
      })
    } else {
      res.json({
        joke: joke.joke,
        type: 'single',
        category,
      })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Erreur lors de la récupération de la blague' })
  }
})

// Get multiple jokes
router.get('/multiple/:count', async (req: Request, res: Response) => {
  try {
    const { count } = req.params
    const jokeCount = Math.min(Math.max(parseInt(count), 1), 10) // Limit between 1 and 10

    const response = await axios.get<JokeResponse>(
      `https://v2.jokeapi.dev/joke/Any?amount=${jokeCount}`
    )

    const jokes = Array.isArray(response.data) ? response.data : [response.data]

    const formattedJokes = jokes.map((joke: JokeResponse) => {
      if (joke.type === 'twopart') {
        return {
          joke: `${joke.setup}\n\n${joke.delivery}`,
          type: 'twopart',
          setup: joke.setup,
          delivery: joke.delivery,
        }
      }
      return {
        joke: joke.joke,
        type: 'single',
      }
    })

    res.json({ jokes: formattedJokes, count: formattedJokes.length })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Erreur lors de la récupération des blagues' })
  }
})

// Get joke categories
router.get('/categories/list', (req: Request, res: Response) => {
  const categories = ['General', 'Knock-Knock', 'Programming', 'Miscellaneous']
  res.json({ categories })
})

export default router
