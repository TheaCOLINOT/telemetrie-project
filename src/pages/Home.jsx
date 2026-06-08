import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          Bienvenue chez ShopHub
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Découvrez notre sélection de produits de qualité à des prix imbattables
        </p>
        <Link
          to="/products"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition text-lg font-semibold"
        >
          Voir les produits
        </Link>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Pourquoi nous choisir ?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-4">✓</div>
            <h3 className="text-xl font-semibold mb-2">Livraison rapide</h3>
            <p className="text-gray-600">Livraison gratuite pour les commandes supérieures à 50€</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-4">💳</div>
            <h3 className="text-xl font-semibold mb-2">Paiements sécurisés</h3>
            <p className="text-gray-600">Transactions protégées avec les meilleurs systèmes de sécurité</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-4">🎧</div>
            <h3 className="text-xl font-semibold mb-2">Support 24/7</h3>
            <p className="text-gray-600">Notre équipe est toujours prête à vous aider</p>
          </div>
        </div>
      </section>
    </div>
  )
}
