import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'
import { Mail, Lock, AlertCircle } from 'lucide-react'
import axios from 'axios'

const Login: React.FC = () => {
  const navigate = useNavigate()
  const { setAuth } = useAuthStore()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData)
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      setAuth(response.data.user, response.data.token)
      navigate('/dashboard')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Identifiants invalides')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
            I
          </div>
          <h1 className="text-3xl font-bold text-gray-900">IDJO CV</h1>
          <p className="text-gray-600 mt-2">Connexion à votre compte</p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 focus-within:border-blue-500">
              <Mail className="w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="jean@example.com"
                className="flex-1 ml-2 outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Mot de passe</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 focus-within:border-blue-500">
              <Lock className="w-5 h-5 text-gray-400" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••"
                className="flex-1 ml-2 outline-none"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 transition"
          >
            {loading ? 'Connexion en cours...' : 'Se connecter'}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Pas encore de compte?{' '}
          <Link to="/register" className="text-blue-600 font-semibold hover:underline">
            S\'inscrire
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login