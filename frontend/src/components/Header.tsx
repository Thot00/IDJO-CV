import React, { useState } from 'react'
import { Menu, X, LogOut, Home, Clock, Laugh } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
            I
          </div>
          <span className="text-2xl font-bold text-gray-900">IDJO CV</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/clock" className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition">
            <Clock size={18} />
            <span>Horloge</span>
          </Link>
          <Link to="/jokes" className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition">
            <Laugh size={18} />
            <span>Blagues</span>
          </Link>

          {user ? (
            <>
              <Link to="/dashboard" className="text-gray-600 hover:text-blue-600 transition">
                Mes CV
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                <LogOut size={18} />
                <span>Déconnexion</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-600 hover:text-blue-600 transition">
                Connexion
              </Link>
              <Link to="/register" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                S'inscrire
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-50 border-t border-gray-200">
          <div className="px-4 py-4 space-y-3">
            <Link
              to="/clock"
              className="block text-gray-600 hover:text-blue-600 py-2"
              onClick={() => setIsOpen(false)}
            >
              Horloge
            </Link>
            <Link
              to="/jokes"
              className="block text-gray-600 hover:text-blue-600 py-2"
              onClick={() => setIsOpen(false)}
            >
              Blagues
            </Link>

            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="block text-gray-600 hover:text-blue-600 py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Mes CV
                </Link>
                <button
                  onClick={() => {
                    handleLogout()
                    setIsOpen(false)
                  }}
                  className="w-full text-left text-red-600 hover:text-red-700 py-2 font-semibold"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block text-gray-600 hover:text-blue-600 py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Connexion
                </Link>
                <Link
                  to="/register"
                  className="block w-full text-center py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  onClick={() => setIsOpen(false)}
                >
                  S'inscrire
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

export default Header