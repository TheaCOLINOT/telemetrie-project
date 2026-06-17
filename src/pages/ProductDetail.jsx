import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import { PRODUCTS } from '../data/products'
import ProductCard from '../components/ProductCard'
import { analytics } from '../lib/analytics'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  const product = PRODUCTS.find((p) => p.id === Number(id))

  useEffect(() => {
    if (product) analytics.productViewed(product)
  }, [product?.id]) 

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 max-w-md text-center">
        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-orange-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
        </div>
        <h1 className="text-xl font-bold text-gray-900 mb-2">Produit introuvable</h1>
        <p className="text-gray-500 mb-6">Ce produit n'existe pas ou a été supprimé.</p>
        <Link to="/products" className="inline-flex items-center gap-2 bg-orange-600 text-white px-5 py-2.5 rounded-xl hover:bg-orange-700 transition-colors font-semibold cursor-pointer">
          Voir tous les produits
        </Link>
      </div>
    )
  }

  const related = PRODUCTS.filter((p) => p.id !== product.id)
  const isLowStock = product.stock <= 5

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addToCart(product)
    analytics.addToCart(product, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2500)
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-7xl">
      <nav aria-label="Fil d'Ariane" className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link to="/" className="hover:text-orange-600 transition-colors cursor-pointer">Accueil</Link>
        <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
        <Link to="/products" className="hover:text-orange-600 transition-colors cursor-pointer">Produits</Link>
        <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
        <span className="text-gray-600 font-medium truncate max-w-[160px]">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-orange-100/60 shadow-sm overflow-hidden">
          <img src={product.image} alt={product.name} className="w-full h-80 lg:h-[480px] object-cover" />
        </div>

        <div className="flex flex-col">
          <span className="inline-block self-start text-xs font-bold text-orange-600 bg-orange-50 border border-orange-100 px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
            {product.category}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3 leading-tight tracking-tight">{product.name}</h1>
          <p className="text-gray-500 leading-relaxed mb-6">{product.description}</p>

          <div className="flex items-center gap-2 mb-6">
            <span className={`w-2 h-2 rounded-full flex-shrink-0 ${isLowStock ? 'bg-amber-500' : 'bg-green-500'}`} />
            <span className={`text-sm font-medium ${isLowStock ? 'text-amber-600' : 'text-green-600'}`}>
              {isLowStock ? `Plus que ${product.stock} en stock` : `En stock (${product.stock} disponibles)`}
            </span>
          </div>

          <div className="mb-8">
            <span className="text-4xl font-extrabold text-orange-700 font-rubik">{product.price.toFixed(2)}€</span>
            <span className="text-gray-400 text-sm ml-2">TTC</span>
          </div>

          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <div className="flex items-center gap-2 bg-white/80 border border-orange-100 rounded-xl p-1" role="group" aria-label="Quantité">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} aria-label="Diminuer la quantité" className="w-9 h-9 rounded-lg bg-orange-50 hover:bg-orange-100 flex items-center justify-center text-orange-700 font-bold text-lg transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-400">−</button>
              <span className="w-8 text-center font-semibold text-gray-900 tabular-nums">{quantity}</span>
              <button onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))} aria-label="Augmenter la quantité" className="w-9 h-9 rounded-lg bg-orange-50 hover:bg-orange-100 flex items-center justify-center text-orange-700 font-bold text-lg transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-400">+</button>
            </div>

            <button
              onClick={handleAddToCart}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-base font-semibold transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 ${added ? 'bg-green-500 text-white focus:ring-green-400' : 'bg-orange-600 text-white hover:bg-orange-700 hover:shadow-lg hover:shadow-orange-300/40 focus:ring-orange-400'}`}
            >
              {added ? (
                <><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>Ajouté au panier !</>
              ) : (
                <><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" /></svg>Ajouter au panier{quantity > 1 && <span className="text-orange-200 text-sm">× {quantity}</span>}</>
              )}
            </button>
          </div>

          <button onClick={() => navigate(-1)} className="self-start flex items-center gap-1.5 text-sm text-gray-400 hover:text-orange-600 transition-colors cursor-pointer mt-2 focus:outline-none focus:ring-2 focus:ring-orange-400 rounded-lg px-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
            Retour
          </button>
        </div>
      </div>

      <section className="mb-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Caractéristiques techniques</h2>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-orange-100/60 shadow-sm overflow-hidden">
          <dl>
            {product.specs.map(({ label, value }, i) => (
              <div key={label} className={`flex items-start gap-4 px-6 py-4 ${i % 2 === 0 ? 'bg-transparent' : 'bg-orange-50/40'}`}>
                <dt className="w-40 flex-shrink-0 text-sm font-semibold text-gray-500">{label}</dt>
                <dd className="text-sm text-gray-900 font-medium">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Vous aimerez aussi</h2>
        <p className="text-gray-500 text-sm mb-6">Découvrez tous nos autres produits</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {related.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  )
}
