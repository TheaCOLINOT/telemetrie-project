import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import { analytics } from '../lib/analytics'

export default function Cart() {
  const { cart, cartTotal, removeFromCart, updateQuantity } = useCart()

  useEffect(() => {
    if (cart.length > 0) analytics.cartViewed(cart.length, cartTotal)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 max-w-md text-center">
        <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-9 h-9 text-orange-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Votre panier est vide</h1>
        <p className="text-gray-500 mb-8">Ajoutez des produits pour commencer vos achats.</p>
        <Link to="/products" className="inline-flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-xl hover:bg-orange-700 transition-colors duration-200 font-semibold cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
          Découvrir les produits
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 tracking-tight">
        Panier
        <span className="ml-3 text-xl font-normal text-gray-400">({cart.length} article{cart.length > 1 ? 's' : ''})</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="bg-white/80 backdrop-blur-sm rounded-2xl border border-orange-100/60 shadow-sm p-4 flex gap-4 hover:shadow-md hover:shadow-orange-100/40 transition-shadow duration-200">
              <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover flex-shrink-0 bg-gray-100" loading="lazy" />
              <div className="flex-1 min-w-0">
                <span className="text-xs font-bold text-orange-600 uppercase tracking-wide">{item.category}</span>
                <h3 className="font-semibold text-gray-900 mt-0.5 line-clamp-1">{item.name}</h3>
                <p className="text-sm text-gray-500 mt-0.5">{item.price.toFixed(2)}€ / unité</p>
                <div className="flex items-center justify-between mt-3 flex-wrap gap-3">
                  <div className="flex items-center gap-2" role="group" aria-label={`Quantité pour ${item.name}`}>
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label="Diminuer la quantité" className="w-8 h-8 rounded-lg bg-orange-50 border border-orange-100 hover:bg-orange-100 flex items-center justify-center text-orange-700 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-400 font-bold text-lg leading-none">−</button>
                    <span className="w-8 text-center font-semibold text-gray-900 tabular-nums">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label="Augmenter la quantité" className="w-8 h-8 rounded-lg bg-orange-50 border border-orange-100 hover:bg-orange-100 flex items-center justify-center text-orange-700 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-400 font-bold text-lg leading-none">+</button>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-orange-700 font-rubik">{(item.price * item.quantity).toFixed(2)}€</span>
                    <button onClick={() => removeFromCart(item.id)} aria-label={`Supprimer ${item.name} du panier`} className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer p-1 rounded-lg hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-400">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-orange-100/60 shadow-sm p-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-5">Résumé</h2>
            <div className="space-y-3 mb-5 pb-5 border-b border-orange-50">
              <div className="flex justify-between text-sm"><span className="text-gray-500">Sous-total</span><span className="font-semibold text-gray-900">{cartTotal.toFixed(2)}€</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500">Livraison</span><span className="font-semibold text-green-600">Gratuite</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500">TVA (20%)</span><span className="font-semibold text-gray-900">{(cartTotal * 0.2).toFixed(2)}€</span></div>
            </div>
            <div className="flex justify-between mb-6">
              <span className="font-bold text-gray-900">Total TTC</span>
              <span className="font-extrabold text-orange-700 text-lg font-rubik">{(cartTotal * 1.2).toFixed(2)}€</span>
            </div>
            <Link
              to="/checkout"
              onClick={() => analytics.checkoutStarted(cart, cartTotal)}
              className="w-full flex items-center justify-center gap-2 bg-orange-600 text-white px-6 py-3.5 rounded-xl hover:bg-orange-700 transition-all duration-200 font-semibold shadow-md shadow-orange-300/40 cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            >
              Passer la commande
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link to="/products" className="w-full flex items-center justify-center mt-3 text-gray-600 px-6 py-3 rounded-xl hover:bg-orange-50 hover:text-orange-700 border border-orange-100 transition-colors duration-200 font-semibold cursor-pointer text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2">
              Continuer les achats
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
