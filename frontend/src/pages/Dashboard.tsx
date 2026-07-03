import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, FileText, Trash2, Eye } from 'lucide-react'
import axios from 'axios'

interface CV {
  id: string
  title: string
  template: string
  createdAt: string
  updatedAt: string
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate()
  const [cvs, setCvs] = useState<CV[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCVs()
  }, [])

  const fetchCVs = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get('http://localhost:5000/api/cv/my-cvs', {
        headers: { Authorization: `Bearer ${token}` },
      })
      setCvs(response.data)
    } catch (error) {
      console.error('Erreur:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateCV = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.post(
        'http://localhost:5000/api/cv/create',
        { title: 'Mon CV', template: 'modern' },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      navigate(`/editor/${response.data.id}`)
    } catch (error) {
      console.error('Erreur:', error)
    }
  }

  const handleDeleteCV = async (id: string) => {
    if (window.confirm('Êtes-vous sûr?')) {
      try {
        const token = localStorage.getItem('token')
        await axios.delete(`http://localhost:5000/api/cv/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        fetchCVs()
      } catch (error) {
        console.error('Erreur:', error)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-lg shadow-md">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Mes CV</h1>
            <p className="text-gray-600 mt-2">Gérez vos CV et créez de nouveaux</p>
          </div>
          <button
            onClick={handleCreateCV}
            className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
          >
            <Plus size={20} />
            <span>Nouveau CV</span>
          </button>
        </div>

        {/* CVs List */}
        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
            <p className="mt-4 text-gray-600">Chargement des CV...</p>
          </div>
        ) : cvs.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Aucun CV</h2>
            <p className="text-gray-600 mb-6">Vous n\'avez pas encore créé de CV</p>
            <button
              onClick={handleCreateCV}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
            >
              Créer mon premier CV
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cvs.map((cv) => (
              <div key={cv.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                <div className="flex items-start justify-between mb-4">
                  <FileText className="w-12 h-12 text-blue-600" />
                  <div className="flex space-x-2">
                    <button
                      onClick={() => navigate(`/editor/${cv.id}`)}
                      className="p-2 hover:bg-blue-100 rounded text-blue-600"
                      title="Éditer"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteCV(cv.id)}
                      className="p-2 hover:bg-red-100 rounded text-red-600"
                      title="Supprimer"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{cv.title}</h3>
                <p className="text-sm text-gray-600 mb-2">Modèle: {cv.template}</p>
                <p className="text-xs text-gray-500 mb-4">
                  Créé: {new Date(cv.createdAt).toLocaleDateString('fr-FR')}
                </p>
                <button
                  onClick={() => navigate(`/editor/${cv.id}`)}
                  className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
                >
                  Éditer
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard