import { useCart } from '../contexts/CartContext'
import { Link, NavLink } from 'react-router-dom'

export default function Header() {
  const { cartCount } = useCart()

  const navLinkClass = ({ isActive }) =>
    `px-4 py-2 rounded-xl text-sm font-semibold transition-colors duration-200 ${
      isActive
        ? 'text-orange-600 bg-orange-100/70'
        : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
    }`

  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-orange-100/60 shadow-sm shadow-orange-100/30">
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between max-w-7xl">
        <Link to="/" className="text-2xl font-bold text-orange-600 font-rubik tracking-tight">
          ShopHub
        </Link>

        <div className="flex items-center gap-1">
          <NavLink to="/" end className={navLinkClass}>Accueil</NavLink>
          <NavLink to="/products" className={navLinkClass}>Produits</NavLink>
          <NavLink
            to="/cart"
            aria-label={`Panier${cartCount > 0 ? `, ${cartCount} article${cartCount > 1 ? 's' : ''}` : ''}`}
            className={({ isActive }) =>
              `relative flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-colors duration-200 cursor-pointer ${
                isActive
                  ? 'text-orange-600 bg-orange-100/70'
                  : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
              }`
            }
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
            <span>Panier</span>
            {cartCount > 0 && (
              <span aria-hidden="true" className="absolute -top-1 right-1 bg-orange-600 text-white text-xs font-bold rounded-full min-w-[1.25rem] h-5 flex items-center justify-center px-1 leading-none">
                {cartCount}
              </span>
            )}
          </NavLink>
        </div>
      </nav>
    </header>
  )
}
