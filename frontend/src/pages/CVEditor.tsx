import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Save, Download } from 'lucide-react'
import axios from 'axios'
import CVPreview from '../components/CVPreview'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

interface CVData {
  id?: string
  title: string
  template: string
  personalInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
    summary: string
  }
  experiences: Array<{
    id?: string
    company: string
    position: string
    description: string
    startDate: string
    endDate: string
  }>
  education: Array<{
    id?: string
    school: string
    degree: string
    field: string
    year: string
  }>
  skills: Array<{
    id?: string
    name: string
    level: string
  }>
}

const CVEditor: React.FC = () => {
  const { cvId } = useParams<{ cvId: string }>()
  const navigate = useNavigate()
  const [tab, setTab] = useState('info')
  const [cvData, setCVData] = useState<CVData>({
    title: 'Mon CV',
    template: 'modern',
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      summary: '',
    },
    experiences: [],
    education: [],
    skills: [],
  })
  const [colors, setColors] = useState({ primary: '#2563eb', secondary: '#f3f4f6' })
  const [font, setFont] = useState('sans')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (cvId) {
      fetchCV()
    } else {
      setLoading(false)
    }
  }, [cvId])

  const fetchCV = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(`http://localhost:5000/api/cv/${cvId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setCVData(response.data)
    } catch (error) {
      console.error('Erreur:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const token = localStorage.getItem('token')
      await axios.put(`http://localhost:5000/api/cv/${cvId}`, cvData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      alert('CV sauvegardé!')
    } catch (error) {
      alert('Erreur lors de la sauvegarde')
    } finally {
      setSaving(false)
    }
  }

  const handleDownloadPDF = async () => {
    const element = document.getElementById('cv-preview')
    if (!element) return

    try {
      const canvas = await html2canvas(element, { scale: 2 })
      const pdf = new jsPDF('p', 'mm', 'a4')
      const imgData = canvas.toDataURL('image/png')
      pdf.addImage(imgData, 'PNG', 0, 0, 210, 297)
      pdf.save(`${cvData.title}.pdf`)
    } catch (error) {
      console.error('Erreur:', error)
    }
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Chargement...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 flex justify-between items-center">
          <div>
            <input
              type="text"
              value={cvData.title}
              onChange={(e) => setCVData({ ...cvData, title: e.target.value })}
              className="text-3xl font-bold outline-none border-b-2 border-transparent hover:border-blue-600 focus:border-blue-600"
            />
          </div>
          <div className="flex space-x-4">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400"
            >
              <Save size={20} />
              <span>{saving ? 'Sauvegarde...' : 'Sauvegarder'}</span>
            </button>
            <button
              onClick={handleDownloadPDF}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Download size={20} />
              <span>PDF</span>
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Editor */}
          <div className="bg-white rounded-lg shadow-md p-6">
            {/* Tabs */}
            <div className="flex space-x-2 mb-6 border-b">
              {['info', 'experiences', 'education', 'skills', 'design'].map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-4 py-2 font-semibold transition ${
                    tab === t ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="space-y-4">
              {tab === 'info' && (
                <>
                  <input
                    type="text"
                    placeholder="Prénom"
                    value={cvData.personalInfo.firstName}
                    onChange={(e) =>
                      setCVData({
                        ...cvData,
                        personalInfo: { ...cvData.personalInfo, firstName: e.target.value },
                      })
                    }
                    className="w-full p-2 border rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Nom"
                    value={cvData.personalInfo.lastName}
                    onChange={(e) =>
                      setCVData({
                        ...cvData,
                        personalInfo: { ...cvData.personalInfo, lastName: e.target.value },
                      })
                    }
                    className="w-full p-2 border rounded-lg"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={cvData.personalInfo.email}
                    onChange={(e) =>
                      setCVData({
                        ...cvData,
                        personalInfo: { ...cvData.personalInfo, email: e.target.value },
                      })
                    }
                    className="w-full p-2 border rounded-lg"
                  />
                  <input
                    type="tel"
                    placeholder="Téléphone"
                    value={cvData.personalInfo.phone}
                    onChange={(e) =>
                      setCVData({
                        ...cvData,
                        personalInfo: { ...cvData.personalInfo, phone: e.target.value },
                      })
                    }
                    className="w-full p-2 border rounded-lg"
                  />
                  <textarea
                    placeholder="Résumé professionnel"
                    value={cvData.personalInfo.summary}
                    onChange={(e) =>
                      setCVData({
                        ...cvData,
                        personalInfo: { ...cvData.personalInfo, summary: e.target.value },
                      })
                    }
                    className="w-full p-2 border rounded-lg h-32"
                  />
                </>
              )}

              {tab === 'design' && (
                <>
                  <div>
                    <label className="block font-semibold mb-2">Modèle</label>
                    <select
                      value={cvData.template}
                      onChange={(e) => setCVData({ ...cvData, template: e.target.value })}
                      className="w-full p-2 border rounded-lg"
                    >
                      <option value="modern">Moderne</option>
                      <option value="classic">Classique</option>
                      <option value="creative">Créatif</option>
                      <option value="minimalist">Minimaliste</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold mb-2">Couleur principale</label>
                    <input
                      type="color"
                      value={colors.primary}
                      onChange={(e) => setColors({ ...colors, primary: e.target.value })}
                      className="w-full p-2 border rounded-lg h-10"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-2">Police</label>
                    <select
                      value={font}
                      onChange={(e) => setFont(e.target.value)}
                      className="w-full p-2 border rounded-lg"
                    >
                      <option value="sans">Sans-serif</option>
                      <option value="serif">Serif</option>
                    </select>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Preview */}
          <div className="bg-white rounded-lg shadow-md p-6 max-h-[800px] overflow-y-auto">
            <CVPreview cvData={cvData} template={cvData.template} colors={colors} font={font} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CVEditor
