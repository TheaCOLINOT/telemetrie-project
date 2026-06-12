import { useState } from 'react'
import ProductCard from '../components/ProductCard'
import { PRODUCTS, CATEGORIES } from '../data/products'
import { analytics } from '../lib/analytics'

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState('Tous')

  const filteredProducts =
    selectedCategory === 'Tous'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === selectedCategory)

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    analytics.categoryFiltered(category)
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-1 tracking-tight">Nos Produits</h1>
        <p className="text-gray-500 text-sm">
          {filteredProducts.length} produit{filteredProducts.length !== 1 ? 's' : ''} disponible{filteredProducts.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filtrer par catégorie">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            aria-pressed={selectedCategory === category}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 ${
              selectedCategory === category
                ? 'bg-orange-600 text-white shadow-md shadow-orange-300/40'
                : 'bg-white/80 text-gray-600 border border-orange-100 hover:border-orange-300 hover:text-orange-700 hover:bg-orange-50'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-20">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-orange-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </div>
          <p className="text-gray-500 text-lg font-medium">Aucun produit trouvé</p>
        </div>
      )}
    </div>
  )
}
