import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useCart()
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulate order processing
    console.log('Commande placée avec les données:', formData)
    setOrderPlaced(true)
    clearCart()
  }

  if (cart.length === 0 && !orderPlaced) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8 text-center">
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

  if (orderPlaced) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8 text-center">
          <div className="text-6xl mb-4">✓</div>
          <h1 className="text-3xl font-bold text-green-600 mb-4">Commande confirmée!</h1>
          <p className="text-gray-600 mb-4">
            Merci pour votre achat. Un email de confirmation a été envoyé à {formData.email}
          </p>
          <p className="text-sm text-gray-500 mb-8">
            Numéro de commande: #{Math.floor(Math.random() * 1000000)}
          </p>
          <Link
            to="/"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Commande</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6">Informations de facturation</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                name="firstName"
                placeholder="Prénom"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Nom"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />

            <input
              type="tel"
              name="phone"
              placeholder="Téléphone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />

            <input
              type="text"
              name="address"
              placeholder="Adresse"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <input
                type="text"
                name="city"
                placeholder="Ville"
                value={formData.city}
                onChange={handleChange}
                required
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <input
                type="text"
                name="zipCode"
                placeholder="Code postal"
                value={formData.zipCode}
                onChange={handleChange}
                required
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Confirmer la commande
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h2 className="text-2xl font-bold mb-6">Résumé de la commande</h2>

            <div className="space-y-4 mb-6 pb-6 border-b">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.name} x{item.quantity}</span>
                  <span>{(item.price * item.quantity).toFixed(2)}€</span>
                </div>
              ))}
            </div>

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

            <div className="flex justify-between text-lg">
              <span className="font-bold">Total</span>
              <span className="font-bold text-blue-600">{(cartTotal * 1.2).toFixed(2)}€</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
