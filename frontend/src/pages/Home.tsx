import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, Zap, Palette, Download, Globe, Laugh, Shield, Smartphone } from 'lucide-react'

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="mb-8">
          <div className="inline-block mb-4">
            <div className="w-20 h-20 bg-blue-600 rounded-xl flex items-center justify-center text-white text-4xl font-bold">
              I
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            IDJO CV
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            Créez votre CV professionnel en quelques minutes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Commencer Gratuitement
            </Link>
            <Link
              to="/login"
              className="px-8 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              Se Connecter
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Nos Fonctionnalités</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
              <BookOpen className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">200+ Modèles</h3>
              <p className="text-gray-600">Choisissez parmi nos modèles de CV professionnels et modernes</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl">
              <Palette className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Personnalisation</h3>
              <p className="text-gray-600">Personnalisez couleurs, polices et mise en page à votre guise</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
              <Download className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Export PDF</h3>
              <p className="text-gray-600">Téléchargez votre CV en PDF haute qualité en un clic</p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-6 rounded-xl">
              <Zap className="w-12 h-12 text-pink-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Temps Réel</h3>
              <p className="text-gray-600">Aperçu en direct de votre CV à chaque modification</p>
            </div>

            {/* Feature 5 */}
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-xl">
              <Shield className="w-12 h-12 text-yellow-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Sécurisé</h3>
              <p className="text-gray-600">Vos données sont protégées avec authentification JWT</p>
            </div>

            {/* Feature 6 */}
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 rounded-xl">
              <Smartphone className="w-12 h-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Responsive</h3>
              <p className="text-gray-600">Fonctionne parfaitement sur mobile, tablette et desktop</p>
            </div>

            {/* Feature 7 */}
            <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 p-6 rounded-xl">
              <Globe className="w-12 h-12 text-cyan-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Horloge Mondiale</h3>
              <p className="text-gray-600">Consultez l'heure dans 19+ fuseaux horaires</p>
            </div>

            {/* Feature 8 */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl">
              <Laugh className="w-12 h-12 text-orange-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Blagues Aléatoires</h3>
              <p className="text-gray-600">Détendez-vous avec notre générateur de blagues</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-16">Comment ça marche?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">1</div>
            <h3 className="text-2xl font-bold mb-4">S'inscrire</h3>
            <p className="text-gray-600">Créez un compte gratuit en quelques secondes</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">2</div>
            <h3 className="text-2xl font-bold mb-4">Remplir les informations</h3>
            <p className="text-gray-600">Entrez vos expériences, formations et compétences</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">3</div>
            <h3 className="text-2xl font-bold mb-4">Télécharger</h3>
            <p className="text-gray-600">Téléchargez votre CV en PDF et postulez!</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Prêt à créer votre CV?</h2>
          <p className="text-xl mb-8">Rejoignez des milliers d'utilisateurs qui ont créé leur CV avec IDJO CV</p>
          <Link
            to="/register"
            className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100 transition text-lg"
          >
            Commencer Maintenant
          </Link>
        </div>
      </section>

      {/* Footer */}
      <section className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-white font-bold mb-4">À propos</h4>
              <p>IDJO CV est une plateforme de création de CV en ligne</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Produit</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition">Modèles</a></li>
                <li><a href="#" className="hover:text-white transition">Tarifs</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
                <li><a href="#" className="hover:text-white transition">Documentation</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Légal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition">Confidentialité</a></li>
                <li><a href="#" className="hover:text-white transition">Conditions</a></li>
                <li><a href="#" className="hover:text-white transition">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center">
            <p>&copy; 2024 IDJO CV. Tous droits réservés.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home