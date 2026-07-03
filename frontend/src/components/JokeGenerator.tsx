import React, { useState } from 'react'
import { RefreshCw, AlertCircle } from 'lucide-react'
import axios from 'axios'

interface Joke {
  setup: string
  delivery: string
  joke?: string
}

const JokeGenerator: React.FC = () => {
  const [joke, setJoke] = useState<Joke | null>(null)
  const [category, setCategory] = useState('any')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const categories = [
    { value: 'any', label: 'Aléatoire' },
    { value: 'general', label: 'Général' },
    { value: 'knock-knock', label: 'Knock-Knock' },
    { value: 'programming', label: 'Programmation' },
    { value: 'miscellaneous', label: 'Divers' },
  ]

  const fetchJoke = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await axios.get('http://localhost:5000/api/jokes/random', {
        params: { category: category === 'any' ? undefined : category },
      })
      setJoke(response.data)
    } catch (err) {
      setError('Erreur lors du chargement de la blague')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-center mb-2">😂 Générateur de Blagues</h1>
        <p className="text-center text-gray-600 mb-8">Riez un bon coup!</p>

        {/* Category selector */}
        <div className="mb-8">
          <label className="block text-gray-700 font-semibold mb-3">Catégorie:</label>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setCategory(cat.value)}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  category === cat.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Get joke button */}
        <button
          onClick={fetchJoke}
          disabled={loading}
          className="w-full py-3 px-6 bg-orange-500 text-white rounded-lg font-bold hover:bg-orange-600 disabled:bg-gray-400 transition flex items-center justify-center space-x-2 mb-8"
        >
          <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
          <span>{loading ? 'Chargement...' : 'Obtenir une blague'}</span>
        </button>

        {/* Joke display */}
        {joke && (
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-8 border-2 border-orange-200">
            {joke.joke ? (
              // Single-line joke
              <div>
                <p className="text-2xl font-bold text-gray-900 mb-4">{joke.joke}</p>
              </div>
            ) : (
              // Two-part joke
              <div>
                <p className="text-xl font-bold text-gray-900 mb-6">{joke.setup}</p>
                <div className="border-t-2 border-orange-300 pt-6">
                  <p className="text-xl text-gray-800">{joke.delivery}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default JokeGenerator