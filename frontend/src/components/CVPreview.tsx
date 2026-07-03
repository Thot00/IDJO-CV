import React, { useState } from 'react'
import { FileText, Download, Save } from 'lucide-react'
import axios from 'axios'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

interface CVData {
  personalInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
    summary: string
  }
  experiences: Array<{
    company: string
    position: string
    description: string
    startDate: string
    endDate: string
  }>
  education: Array<{
    school: string
    degree: string
    field: string
    year: string
  }>
  skills: Array<{
    name: string
    level: string
  }>
}

const CVPreview: React.FC<{ cvData: CVData; template: string; colors: { primary: string; secondary: string }; font: string }> = ({
  cvData,
  template,
  colors,
  font,
}) => {
  const getTemplateStyles = () => {
    const baseStyles = {
      fontFamily: font === 'serif' ? 'Georgia, serif' : 'Arial, sans-serif',
    }

    switch (template) {
      case 'modern':
        return {
          ...baseStyles,
          header: { backgroundColor: colors.primary, color: 'white', padding: '30px' },
          section: { borderLeft: `4px solid ${colors.primary}`, paddingLeft: '20px', marginTop: '20px' },
        }
      case 'classic':
        return {
          ...baseStyles,
          header: { borderBottom: `2px solid ${colors.primary}`, paddingBottom: '20px' },
          section: { marginTop: '20px' },
        }
      case 'creative':
        return {
          ...baseStyles,
          header: { backgroundColor: colors.secondary, color: colors.primary, padding: '30px', borderRadius: '10px' },
          section: { backgroundColor: '#f5f5f5', padding: '15px', marginTop: '20px', borderRadius: '5px' },
        }
      default:
        return baseStyles
    }
  }

  const styles = getTemplateStyles()

  return (
    <div
      id="cv-preview"
      style={styles}
      className="bg-white p-12 text-gray-900"
    >
      {/* Header */}
      <div style={styles.header} className="mb-8 -mx-12 -mt-12 px-12 py-8">
        <h1 className="text-4xl font-bold">
          {cvData.personalInfo.firstName} {cvData.personalInfo.lastName}
        </h1>
        <div className="flex space-x-4 mt-2 text-sm">
          <span>{cvData.personalInfo.email}</span>
          <span>•</span>
          <span>{cvData.personalInfo.phone}</span>
        </div>
      </div>

      {/* Summary */}
      {cvData.personalInfo.summary && (
        <div style={styles.section}>
          <h2 className="text-2xl font-bold mb-2">Résumé</h2>
          <p>{cvData.personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {cvData.experiences.length > 0 && (
        <div style={styles.section}>
          <h2 className="text-2xl font-bold mb-4">Expériences</h2>
          {cvData.experiences.map((exp, i) => (
            <div key={i} className="mb-4">
              <div className="flex justify-between">
                <h3 className="text-lg font-bold">{exp.position}</h3>
                <span className="text-sm text-gray-600">
                  {exp.startDate} - {exp.endDate}
                </span>
              </div>
              <p className="text-gray-600">{exp.company}</p>
              <p className="mt-1">{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {cvData.education.length > 0 && (
        <div style={styles.section}>
          <h2 className="text-2xl font-bold mb-4">Formations</h2>
          {cvData.education.map((edu, i) => (
            <div key={i} className="mb-4">
              <div className="flex justify-between">
                <h3 className="text-lg font-bold">{edu.degree}</h3>
                <span className="text-sm text-gray-600">{edu.year}</span>
              </div>
              <p className="text-gray-600">{edu.school}</p>
              <p className="text-sm">{edu.field}</p>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {cvData.skills.length > 0 && (
        <div style={styles.section}>
          <h2 className="text-2xl font-bold mb-4">Compétences</h2>
          <div className="flex flex-wrap gap-2">
            {cvData.skills.map((skill, i) => (
              <span key={i} className="bg-gray-200 px-3 py-1 rounded-full text-sm">
                {skill.name} ({skill.level})
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default CVPreview