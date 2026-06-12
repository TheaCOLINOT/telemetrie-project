import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import { analytics } from '../lib/analytics'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
    analytics.addToCart(product, 1)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <Link
      to={`/products/${product.id}`}
      className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-orange-100/60 overflow-hidden hover:shadow-xl hover:shadow-orange-200/30 transition-all duration-300 flex flex-col focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
    >
      <div className="overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>

      <div className="p-5 flex flex-col flex-1">
        <span className="inline-block self-start text-xs font-bold text-orange-600 bg-orange-50 border border-orange-100 px-2.5 py-1 rounded-full mb-3 uppercase tracking-wide">
          {product.category}
        </span>
        <h3 className="text-base font-semibold text-gray-900 mb-1.5 line-clamp-2 leading-snug">
          {product.name}
        </h3>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed flex-1">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-orange-50">
          <span className="text-xl font-bold text-orange-700 font-rubik">
            {product.price.toFixed(2)}€
          </span>
          <button
            onClick={handleAddToCart}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              added
                ? 'bg-green-500 text-white focus:ring-green-400 scale-95'
                : 'bg-orange-600 text-white hover:bg-orange-700 hover:shadow-lg hover:shadow-orange-300/40 focus:ring-orange-400'
            }`}
          >
            {added ? (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                Ajouté !
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
                Ajouter
              </>
            )}
          </button>
        </div>
      </div>
    </Link>
  )
}

