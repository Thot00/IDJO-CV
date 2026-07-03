import React, { useState, useRef, useEffect } from 'react'
import { useCVStore, CVData } from '../stores/cvStore'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

interface CVPreviewProps {
  cv: CVData
}

const CVPreview: React.FC<CVPreviewProps> = ({ cv }) => {
  const previewRef = useRef<HTMLDivElement>(null)

  const getColorClass = (color: string): string => {
    const colorMap: { [key: string]: string } = {
      '#2563eb': 'text-blue-600',
      '#dc2626': 'text-red-600',
      '#059669': 'text-green-600',
      '#7c3aed': 'text-purple-600',
    }
    return colorMap[color] || 'text-blue-600'
  }

  const downloadPDF = async () => {
    if (!previewRef.current) return

    try {
      const element = previewRef.current
      const canvas = await html2canvas(element, { scale: 2, useCORS: true })
      const imgData = canvas.toDataURL('image/png')

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      })

      const imgWidth = 210
      const pageHeight = 295
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight
      let position = 0

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      pdf.save(`${cv.personalInfo.firstName}-${cv.personalInfo.lastName}-CV.pdf`)
    } catch (error) {
      console.error('Erreur lors du téléchargement du PDF:', error)
      alert('Erreur lors du téléchargement du PDF')
    }
  }

  if (cv.template === 'modern') {
    return (
      <div
        ref={previewRef}
        className="w-full bg-white p-8 text-gray-900 font-sans"
        style={{
          fontFamily: cv.design.fontFamily === 'serif' ? 'Georgia, serif' : 'Segoe UI, sans-serif',
        }}
      >
        {/* Header */}
        <div className="mb-8 pb-6 border-b-4" style={{ borderColor: cv.design.primaryColor }}>
          <h1 className="text-4xl font-bold mb-2" style={{ color: cv.design.primaryColor }}>
            {cv.personalInfo.firstName} {cv.personalInfo.lastName}
          </h1>
          <div className="flex space-x-6 text-sm text-gray-600">
            {cv.personalInfo.email && <div>{cv.personalInfo.email}</div>}
            {cv.personalInfo.phone && <div>{cv.personalInfo.phone}</div>}
          </div>
        </div>

        {/* Summary */}
        {cv.personalInfo.summary && (
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-3" style={{ color: cv.design.primaryColor }}>
              Résumé Professionnel
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">{cv.personalInfo.summary}</p>
          </div>
        )}

        {/* Experience */}
        {cv.experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-3" style={{ color: cv.design.primaryColor }}>
              Expériences Professionnelles
            </h2>
            {cv.experience.map((exp) => (
              <div key={exp.id} className="mb-4">
                <div className="flex justify-between">
                  <h3 className="font-bold text-gray-900">{exp.position}</h3>
                  <span className="text-sm text-gray-600">
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                <p className="text-sm" style={{ color: cv.design.primaryColor }}>
                  {exp.company}
                </p>
                <p className="text-sm text-gray-700 mt-2">{exp.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {cv.education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-3" style={{ color: cv.design.primaryColor }}>
              Formation
            </h2>
            {cv.education.map((edu) => (
              <div key={edu.id} className="mb-3">
                <div className="flex justify-between">
                  <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                  <span className="text-sm text-gray-600">{edu.graduationDate}</span>
                </div>
                <p className="text-sm" style={{ color: cv.design.primaryColor }}>
                  {edu.school}
                </p>
                <p className="text-sm text-gray-700">{edu.field}</p>
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {cv.skills.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-3" style={{ color: cv.design.primaryColor }}>
              Compétences
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {cv.skills.map((skill) => (
                <div key={skill.id} className="flex items-center space-x-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: cv.design.primaryColor }}
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-sm">{skill.name}</div>
                    <div className="text-xs text-gray-600">{skill.level}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div ref={previewRef} className="w-full bg-white p-8 text-gray-900">
      <h1 className="text-3xl font-bold mb-4">
        {cv.personalInfo.firstName} {cv.personalInfo.lastName}
      </h1>
      <p>{cv.personalInfo.email} - {cv.personalInfo.phone}</p>
      {cv.personalInfo.summary && <p className="mt-4">{cv.personalInfo.summary}</p>}
    </div>
  )
}

export default CVPreview
