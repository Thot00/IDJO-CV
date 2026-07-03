import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useCVStore } from '../stores/cvStore'
import { Download, Save, Plus, Trash2 } from 'lucide-react'
import CVPreview from '../components/CVPreview'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

const CVEditor: React.FC = () => {
  const { cvId } = useParams<{ cvId: string }>()
  const navigate = useNavigate()
  const { cv, updatePersonalInfo, updateCV, addExperience, addEducation, addSkill, removeExperience, removeEducation, removeSkill } = useCVStore()
  const [activeTab, setActiveTab] = useState<'info' | 'experience' | 'education' | 'skills' | 'design'>('info')
  const [saving, setSaving] = useState(false)

  const handleDownloadPDF = async () => {
    try {
      const element = document.getElementById('cv-preview')
      if (element) {
        const canvas = await (window as any).html2canvas(element, { scale: 2 })
        const imgData = canvas.toDataURL('image/png')
        const pdf = new (window as any).jsPDF()
        pdf.addImage(imgData, 'PNG', 10, 10)
        pdf.save(`${cv.personalInfo.firstName}-${cv.personalInfo.lastName}-CV.pdf`)
      }
    } catch (error) {
      console.error('Erreur:', error)
      alert('Erreur lors du téléchargement')
    }
  }

  const handleSaveCV = async () => {
    setSaving(true)
    try {
      const token = localStorage.getItem('token')
      await axios.put(
        `/api/cv/${cvId}`,
        { ...cv },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      alert('CV sauvegardé avec succès!')
    } catch (error) {
      console.error('Erreur:', error)
      alert('Erreur lors de la sauvegarde')
    } finally {
      setSaving(false)
    }
  }

  const templates = [
    { id: 'modern', name: 'Moderne', description: 'Design moderne et professionnel' },
    { id: 'classic', name: 'Classique', description: 'Design classique intemporel' },
    { id: 'creative', name: 'Créatif', description: 'Design créatif et original' },
    { id: 'minimalist', name: 'Minimaliste', description: 'Design épuré et simple' },
  ]

  const colors = [
    { value: '#2563eb', label: 'Bleu' },
    { value: '#dc2626', label: 'Rouge' },
    { value: '#059669', label: 'Vert' },
    { value: '#7c3aed', label: 'Violet' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-md">
          <input
            type="text"
            value={cv.title}
            onChange={(e) => updateCV({ title: e.target.value })}
            className="text-3xl font-bold outline-none border-b-2 border-blue-600 focus:border-blue-700"
          />
          <div className="flex space-x-3">
            <button
              onClick={handleSaveCV}
              disabled={saving}
              className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
            >
              <Save size={20} />
              <span>{saving ? 'Sauvegarde...' : 'Sauvegarder'}</span>
            </button>
            <button
              onClick={handleDownloadPDF}
              className="flex items-center space-x-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <Download size={20} />
              <span>Télécharger PDF</span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Editor Panel */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              {/* Tabs */}
              <div className="flex space-x-4 mb-6 border-b overflow-x-auto">
                {['info', 'experience', 'education', 'skills', 'design'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`px-4 py-2 font-semibold whitespace-nowrap ${
                      activeTab === tab
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              {activeTab === 'info' && (
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Prénom</label>
                      <input
                        type="text"
                        value={cv.personalInfo.firstName}
                        onChange={(e) => updatePersonalInfo({ firstName: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Nom</label>
                      <input
                        type="text"
                        value={cv.personalInfo.lastName}
                        onChange={(e) => updatePersonalInfo({ lastName: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Email</label>
                    <input
                      type="email"
                      value={cv.personalInfo.email}
                      onChange={(e) => updatePersonalInfo({ email: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Téléphone</label>
                    <input
                      type="tel"
                      value={cv.personalInfo.phone}
                      onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Résumé professionnel</label>
                    <textarea
                      value={cv.personalInfo.summary || ''}
                      onChange={(e) => updatePersonalInfo({ summary: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 h-24"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'experience' && (
                <div className="space-y-4">
                  {cv.experience.map((exp, idx) => (
                    <div key={exp.id} className="p-4 border border-gray-300 rounded-lg">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-semibold text-gray-900">Expérience {idx + 1}</h3>
                        <button
                          onClick={() => removeExperience(exp.id)}
                          className="p-2 hover:bg-red-100 rounded text-red-600"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                      <div className="space-y-3">
                        <input
                          type="text"
                          placeholder="Entreprise"
                          value={exp.company}
                          className="w-full px-3 py-2 border border-gray-200 rounded bg-gray-50"
                          disabled
                        />
                        <input
                          type="text"
                          placeholder="Poste"
                          value={exp.position}
                          className="w-full px-3 py-2 border border-gray-200 rounded bg-gray-50"
                          disabled
                        />
                        <textarea
                          placeholder="Description"
                          value={exp.description}
                          className="w-full px-3 py-2 border border-gray-200 rounded bg-gray-50 h-16"
                          disabled
                        />
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() =>
                      addExperience({
                        id: uuidv4(),
                        company: '',
                        position: '',
                        startDate: '',
                        endDate: '',
                        description: '',
                      })
                    }
                    className="flex items-center space-x-2 w-full px-4 py-2 border-2 border-dashed border-blue-300 rounded-lg text-blue-600 hover:bg-blue-50"
                  >
                    <Plus size={20} />
                    <span>Ajouter une expérience</span>
                  </button>
                </div>
              )}

              {activeTab === 'education' && (
                <div className="space-y-4">
                  {cv.education.map((edu, idx) => (
                    <div key={edu.id} className="p-4 border border-gray-300 rounded-lg">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-semibold text-gray-900">Formation {idx + 1}</h3>
                        <button
                          onClick={() => removeEducation(edu.id)}
                          className="p-2 hover:bg-red-100 rounded text-red-600"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                      <div className="space-y-3 text-gray-600 text-sm">
                        <p><strong>École:</strong> {edu.school}</p>
                        <p><strong>Diplôme:</strong> {edu.degree}</p>
                        <p><strong>Domaine:</strong> {edu.field}</p>
                        <p><strong>Date:</strong> {edu.graduationDate}</p>
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() =>
                      addEducation({
                        id: uuidv4(),
                        school: '',
                        degree: '',
                        field: '',
                        graduationDate: '',
                      })
                    }
                    className="flex items-center space-x-2 w-full px-4 py-2 border-2 border-dashed border-blue-300 rounded-lg text-blue-600 hover:bg-blue-50"
                  >
                    <Plus size={20} />
                    <span>Ajouter une formation</span>
                  </button>
                </div>
              )}

              {activeTab === 'skills' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {cv.skills.map((skill, idx) => (
                      <div key={skill.id} className="p-3 border border-gray-300 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900">{skill.name}</p>
                            <p className="text-sm text-gray-600">{skill.level}</p>
                          </div>
                          <button
                            onClick={() => removeSkill(skill.id)}
                            className="p-1 hover:bg-red-100 rounded text-red-600"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() =>
                      addSkill({
                        id: uuidv4(),
                        name: '',
                        level: 'Intermédiaire',
                      })
                    }
                    className="flex items-center space-x-2 w-full px-4 py-2 border-2 border-dashed border-blue-300 rounded-lg text-blue-600 hover:bg-blue-50"
                  >
                    <Plus size={20} />
                    <span>Ajouter une compétence</span>
                  </button>
                </div>
              )}

              {activeTab === 'design' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-3">Modèle</label>
                    <div className="grid grid-cols-2 gap-3">
                      {templates.map((template) => (
                        <button
                          key={template.id}
                          onClick={() => updateCV({ template: template.id })}
                          className={`p-4 rounded-lg border-2 transition ${
                            cv.template === template.id
                              ? 'border-blue-600 bg-blue-50'
                              : 'border-gray-300 hover:border-blue-400'
                          }`}
                        >
                          <div className="font-semibold text-gray-900">{template.name}</div>
                          <div className="text-xs text-gray-600 mt-1">{template.description}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-3">Couleur principale</label>
                    <div className="grid grid-cols-4 gap-3">
                      {colors.map((color) => (
                        <button
                          key={color.value}
                          onClick={() => updateCV({ design: { ...cv.design, primaryColor: color.value } })}
                          className={`p-6 rounded-lg border-2 transition ${
                            cv.design.primaryColor === color.value ? 'border-gray-900' : 'border-gray-300'
                          }`}
                          style={{ backgroundColor: color.value }}
                          title={color.label}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-3">Police d'écriture</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => updateCV({ design: { ...cv.design, fontFamily: 'sans' } })}
                        className={`p-4 rounded-lg border-2 transition ${
                          cv.design.fontFamily === 'sans'
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-300 hover:border-blue-400'
                        }`}
                      >
                        <div className="font-semibold">Sans-serif</div>
                      </button>
                      <button
                        onClick={() => updateCV({ design: { ...cv.design, fontFamily: 'serif' } })}
                        className={`p-4 rounded-lg border-2 transition ${
                          cv.design.fontFamily === 'serif'
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-300 hover:border-blue-400'
                        }`}
                      >
                        <div className="font-serif font-semibold">Serif</div>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Preview Panel */}
          <div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-20">
              <div className="bg-gray-100 p-4 border-b">
                <h3 className="text-lg font-bold text-gray-900">Aperçu du CV</h3>
              </div>
              <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
                <div id="cv-preview" className="transform scale-50 origin-top-left" style={{ width: '200%' }}>
                  <CVPreview cv={cv} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CVEditor
