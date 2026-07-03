import React, { useState } from 'react'
import { Laugh, RotateCw } from 'lucide-react'
import axios from 'axios'

interface Joke {
  joke: string
  type: string
  setup?: string
  delivery?: string
}

const JokeGenerator: React.FC = () => {
  const [joke, setJoke] = useState<Joke | null>(null)
  const [loading, setLoading] = useState(false)
  const [category, setCategory] = useState('random')
  const [showDelivery, setShowDelivery] = useState(false)

  const categories = ['random', 'General', 'Knock-Knock', 'Programming', 'Miscellaneous']

  const fetchJoke = async () => {
    setLoading(true)
    setShowDelivery(false)

    try {
      let url = '/api/jokes/random'
      if (category !== 'random') {
        url = `/api/jokes/category/${category}`
      }

      const response = await axios.get<Joke>(url)
      setJoke(response.data)
    } catch (error) {
      console.error('Erreur lors de la récupération de la blague:', error)
      alert('Erreur lors de la récupération de la blague')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-center space-x-3 mb-8">
        <Laugh className="w-8 h-8 text-white" />
        <h1 className="text-3xl font-bold text-white">Générateur de Blagues</h1>
      </div>

      {/* Category Selection */}
      <div className="mb-6">
        <label className="block text-white font-semibold mb-3">Sélectionnez une catégorie:</label>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setCategory(cat)
                setJoke(null)
              }}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                category === cat
                  ? 'bg-white text-purple-600 shadow-lg'
                  : 'bg-purple-400 text-white hover:bg-purple-300'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Get Joke Button */}
      <div className="flex justify-center mb-6">
        <button
          onClick={fetchJoke}
          disabled={loading}
          className="flex items-center space-x-2 px-8 py-3 bg-white text-purple-600 font-bold rounded-lg hover:shadow-lg transition disabled:opacity-50"
        >
          <RotateCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          <span>{loading ? 'Chargement...' : 'Obtenir une blague'}</span>
        </button>
      </div>

      {/* Joke Display */}
      {joke && (
        <div className="bg-white rounded-xl p-8 shadow-lg">
          {joke.type === 'twopart' ? (
            <div className="text-center">
              <p className="text-lg text-gray-800 mb-6 font-semibold">{joke.setup}</p>
              {showDelivery && (
                <div className="text-lg text-purple-600 font-bold p-4 bg-purple-50 rounded-lg">
                  {joke.delivery}
                </div>
              )}
              {!showDelivery && (
                <button
                  onClick={() => setShowDelivery(true)}
                  className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold"
                >
                  Voir la chute
                </button>
              )}
            </div>
          ) : (
            <p className="text-lg text-gray-800 text-center">{joke.joke}</p>
          )}
        </div>
      )}

      {/* Empty State */}
      {!joke && !loading && (
        <div className="bg-white rounded-xl p-8 text-center shadow-lg">
          <Laugh className="w-16 h-16 text-purple-200 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">Cliquez sur le bouton pour obtenir une blague!</p>
        </div>
      )}
    </div>
  )
}

export default JokeGenerator
