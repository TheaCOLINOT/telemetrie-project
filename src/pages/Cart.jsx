import { Link } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'

export default function Cart() {
  const { cart, cartTotal, removeFromCart, updateQuantity } = useCart()

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Panier</h1>
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-xl text-gray-600 mb-6">Votre panier est vide</p>
          <Link
            to="/products"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Continuer vos achats
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Panier</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Produit</th>
                  <th className="px-6 py-4 text-center font-semibold">Prix</th>
                  <th className="px-6 py-4 text-center font-semibold">Quantité</th>
                  <th className="px-6 py-4 text-right font-semibold">Total</th>
                  <th className="px-6 py-4 text-right font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div>
                          <p className="font-semibold">{item.name}</p>
                          <p className="text-sm text-gray-500">{item.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">{item.price.toFixed(2)}€</td>
                    <td className="px-6 py-4 text-center">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item.id, parseInt(e.target.value))
                        }
                        className="w-16 px-2 py-1 border rounded text-center"
                      />
                    </td>
                    <td className="px-6 py-4 text-right font-semibold">
                      {(item.price * item.quantity).toFixed(2)}€
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 hover:text-red-800 font-semibold transition"
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h2 className="text-2xl font-bold mb-6">Résumé de la commande</h2>
            
            <div className="space-y-4 mb-6 pb-6 border-b">
              <div className="flex justify-between">
                <span className="text-gray-600">Sous-total</span>
                <span className="font-semibold">{cartTotal.toFixed(2)}€</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Livraison</span>
                <span className="font-semibold">Gratuite</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">TVA (20%)</span>
                <span className="font-semibold">{(cartTotal * 0.2).toFixed(2)}€</span>
              </div>
            </div>

            <div className="flex justify-between mb-6 text-lg">
              <span className="font-bold">Total</span>
              <span className="font-bold text-blue-600">{(cartTotal * 1.2).toFixed(2)}€</span>
            </div>

            <Link
              to="/checkout"
              className="w-full block text-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Passer la commande
            </Link>

            <Link
              to="/products"
              className="w-full block text-center mt-3 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition font-semibold"
            >
              Continuer les achats
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
