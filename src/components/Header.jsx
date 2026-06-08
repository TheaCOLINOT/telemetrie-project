import { useCart } from '../contexts/CartContext'
import { Link } from 'react-router-dom'

export default function Header() {
  const { cartCount } = useCart()

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          ShopHub
        </Link>
        
        <div className="flex items-center gap-6">
          <Link to="/" className="text-gray-700 hover:text-blue-600 transition">
            Accueil
          </Link>
          <Link to="/products" className="text-gray-700 hover:text-blue-600 transition">
            Produits
          </Link>
          <Link to="/cart" className="relative text-gray-700 hover:text-blue-600 transition">
            🛒 Panier
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  )
}
