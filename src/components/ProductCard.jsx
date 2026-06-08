import { useCart } from '../contexts/CartContext'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart(product)
    alert(`${product.name} ajouté au panier!`)
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img 
        src={product.image} 
        alt={product.name}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <p className="text-sm text-gray-500 mb-2">{product.category}</p>
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-blue-600">
            {product.price.toFixed(2)}€
          </span>
          <button
            onClick={handleAddToCart}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Ajouter
          </button>
        </div>
      </div>
    </div>
  )
}
