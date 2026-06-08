import { useState } from 'react'
import ProductCard from '../components/ProductCard'
import { PRODUCTS, CATEGORIES } from '../data/products'

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState('Tous')

  const filteredProducts =
    selectedCategory === 'Tous'
      ? PRODUCTS
      : PRODUCTS.filter((product) => product.category === selectedCategory)

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Nos Produits</h1>

      {/* Category Filter */}
      <div className="mb-8 flex flex-wrap gap-2">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              selectedCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">Aucun produit trouvé</p>
        </div>
      )}
    </div>
  )
}
