import { create } from 'zustand'

interface User {
  id: string
  name: string
  email: string
}

interface AuthStore {
  user: User | null
  token: string | null
  setAuth: (user: User, token: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthStore>((set) => {
  const storedToken = localStorage.getItem('token')
  const storedUser = localStorage.getItem('user')

  return {
    user: storedUser ? JSON.parse(storedUser) : null,
    token: storedToken,
    setAuth: (user, token) => {
      set({ user, token })
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('token', token)
    },
    logout: () => {
      set({ user: null, token: null })
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    },
  }
})
