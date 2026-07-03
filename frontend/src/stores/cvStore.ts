import { create } from 'zustand'

interface CV {
  id: string
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

interface CVStore {
  currentCV: CV | null
  setCurrentCV: (cv: CV) => void
  updateCV: (cv: Partial<CV>) => void
  clearCV: () => void
}

const defaultCV: CV = {
  id: '',
  title: '',
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
}

export const useCVStore = create<CVStore>((set) => ({
  currentCV: null,
  setCurrentCV: (cv) => set({ currentCV: cv }),
  updateCV: (updates) =>
    set((state) => ({
      currentCV: state.currentCV ? { ...state.currentCV, ...updates } : null,
    })),
  clearCV: () => set({ currentCV: null }),
}))
