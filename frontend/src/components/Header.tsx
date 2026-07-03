import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'
import { LogOut, Menu, Clock, Laugh } from 'lucide-react'

const Header: React.FC = () => {
  const { isAuthenticated, logout, user } = useAuthStore()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = React.useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
              I
            </div>
            <span className="text-xl font-bold text-gray-900">IDJÔ CV</span>
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/clock" className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 font-medium">
              <Clock size={18} />
              <span>Horloge</span>
            </Link>
            <Link to="/jokes" className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 font-medium">
              <Laugh size={18} />
              <span>Blagues</span>
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-gray-600 hover:text-blue-600 font-medium">
                  Mes CV
                </Link>
                <div className="flex items-center space-x-4">
                  <span className="text-gray-600">Bonjour, {user?.name}</span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    <LogOut size={18} />
                    <span>Déconnexion</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-blue-600 font-medium">
                  Connexion
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                >
                  S'inscrire
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 flex flex-col space-y-4">
            <Link to="/clock" className="text-gray-600 hover:text-blue-600 flex items-center space-x-1">
              <Clock size={18} />
              <span>Horloge</span>
            </Link>
            <Link to="/jokes" className="text-gray-600 hover:text-blue-600 flex items-center space-x-1">
              <Laugh size={18} />
              <span>Blagues</span>
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-gray-600 hover:text-blue-600">
                  Mes CV
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg"
                >
                  <LogOut size={18} />
                  <span>Déconnexion</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600">
                  Connexion
                </Link>
                <Link to="/register" className="px-6 py-2 bg-blue-600 text-white rounded-lg">
                  S'inscrire
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
