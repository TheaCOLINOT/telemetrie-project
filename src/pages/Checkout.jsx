import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import { analytics } from '../lib/analytics'

const validate = (data) => {
  const errors = {}
  if (!data.firstName.trim()) errors.firstName = 'Le prénom est requis'
  if (!data.lastName.trim()) errors.lastName = 'Le nom est requis'
  if (!data.email.trim()) errors.email = "L'email est requis"
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'Adresse email invalide'
  if (!data.phone.trim()) errors.phone = 'Le téléphone est requis'
  else if (!/^[+\d\s()\-]{7,}$/.test(data.phone)) errors.phone = 'Numéro invalide'
  if (!data.address.trim()) errors.address = "L'adresse est requise"
  if (!data.city.trim()) errors.city = 'La ville est requise'
  if (!data.zipCode.trim()) errors.zipCode = 'Le code postal est requis'
  else if (!/^\d{4,6}$/.test(data.zipCode)) errors.zipCode = 'Code postal invalide'
  return errors
}

function FormField({ id, label, type = 'text', name, placeholder, value, onChange, onBlur, required, autoComplete, error }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-gray-700">
        {label}
        {required && <span className="text-orange-500 ml-0.5" aria-hidden="true">*</span>}
      </label>
      <input
        id={id} type={type} name={name} placeholder={placeholder}
        value={value} onChange={onChange} onBlur={onBlur}
        required={required} autoComplete={autoComplete}
        aria-invalid={!!error} aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full px-4 py-2.5 border rounded-xl bg-white/80 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 ${
          error ? 'border-red-400 focus:ring-red-400 bg-red-50/20' : 'border-gray-200 focus:ring-orange-400'
        }`}
      />
      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs text-red-500 flex items-center gap-1">
          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
          {error}
        </p>
      )}
    </div>
  )
}

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useCart()
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderNumber] = useState(() => Math.floor(Math.random() * 900000) + 100000)
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', phone: '', address: '', city: '', zipCode: '' })
  const [touched, setTouched] = useState({})

  const errors = validate(formData)
  const visibleErrors = Object.fromEntries(Object.entries(errors).filter(([key]) => touched[key]))
  const isFormValid = Object.keys(errors).length === 0

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const currentErrors = validate(formData)
    if (Object.keys(currentErrors).length > 0) {
      setTouched(Object.fromEntries(Object.keys(formData).map((k) => [k, true])))
      analytics.checkoutValidationError(Object.keys(currentErrors))
      return
    }
    analytics.orderCompleted(orderNumber, cartTotal)
    setOrderPlaced(true)
    clearCart()
  }

  if (cart.length === 0 && !orderPlaced) {
    return (
      <div className="container mx-auto px-4 py-20 max-w-md text-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-orange-100/60 shadow-sm p-10">
          <p className="text-lg text-gray-600 mb-6 font-medium">Votre panier est vide</p>
          <Link to="/products" className="inline-flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-xl hover:bg-orange-700 transition-colors font-semibold cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
            Découvrir les produits
          </Link>
        </div>
      </div>
    )
  }

  if (orderPlaced) {
    return (
      <div className="container mx-auto px-4 py-20 max-w-md text-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-orange-100/60 shadow-sm p-10">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Commande confirmée !</h1>
          <p className="text-gray-500 mb-1 text-sm">Merci <strong>{formData.firstName}</strong> ! Un email de confirmation a été envoyé à</p>
          <p className="text-orange-600 font-semibold text-sm mb-4">{formData.email}</p>
          <p className="text-xs text-gray-400 mb-8 bg-gray-50 rounded-lg px-4 py-2 inline-block">Commande n° <strong>#{orderNumber}</strong></p>
          <Link to="/" className="w-full flex items-center justify-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-xl hover:bg-orange-700 transition-colors font-semibold cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 tracking-tight">Finaliser la commande</h1>

      <nav aria-label="Étapes de la commande" className="flex items-center gap-2 mb-10">
        {[{ label: 'Panier', done: true }, { label: 'Informations', active: true }, { label: 'Confirmation' }].map(({ label, done, active }, i) => (
          <div key={label} className="flex items-center gap-2">
            {i > 0 && <svg className="w-4 h-4 text-gray-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>}
            <span className={`text-sm font-semibold px-3 py-1 rounded-full ${active ? 'bg-orange-600 text-white' : done ? 'text-orange-600' : 'text-gray-400'}`}>{label}</span>
          </div>
        ))}
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} noValidate className="bg-white/80 backdrop-blur-sm rounded-2xl border border-orange-100/60 shadow-sm p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-orange-50">Informations de livraison</h2>
            <fieldset className="space-y-5">
              <legend className="sr-only">Coordonnées personnelles</legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField id="firstName" label="Prénom" name="firstName" placeholder="Marie" value={formData.firstName} onChange={handleChange} onBlur={handleBlur} required autoComplete="given-name" error={visibleErrors.firstName} />
                <FormField id="lastName" label="Nom" name="lastName" placeholder="Dupont" value={formData.lastName} onChange={handleChange} onBlur={handleBlur} required autoComplete="family-name" error={visibleErrors.lastName} />
              </div>
              <FormField id="email" label="Adresse email" type="email" name="email" placeholder="marie@exemple.fr" value={formData.email} onChange={handleChange} onBlur={handleBlur} required autoComplete="email" error={visibleErrors.email} />
              <FormField id="phone" label="Téléphone" type="tel" name="phone" placeholder="+33 6 12 34 56 78" value={formData.phone} onChange={handleChange} onBlur={handleBlur} required autoComplete="tel" error={visibleErrors.phone} />
              <FormField id="address" label="Adresse" name="address" placeholder="12 rue de la Paix" value={formData.address} onChange={handleChange} onBlur={handleBlur} required autoComplete="street-address" error={visibleErrors.address} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField id="city" label="Ville" name="city" placeholder="Paris" value={formData.city} onChange={handleChange} onBlur={handleBlur} required autoComplete="address-level2" error={visibleErrors.city} />
                <FormField id="zipCode" label="Code postal" name="zipCode" placeholder="75001" value={formData.zipCode} onChange={handleChange} onBlur={handleBlur} required autoComplete="postal-code" error={visibleErrors.zipCode} />
              </div>
            </fieldset>
            <p className="text-xs text-gray-400 mt-4"><span className="text-orange-500">*</span> Champs obligatoires</p>
            <button
              type="submit"
              disabled={Object.keys(touched).length > 0 && !isFormValid}
              className={`w-full mt-8 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${Object.keys(touched).length > 0 && !isFormValid ? 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none focus:ring-gray-300' : 'bg-orange-600 text-white hover:bg-orange-700 shadow-orange-300/40 cursor-pointer focus:ring-orange-500'}`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Confirmer la commande
            </button>
          </form>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-orange-100/60 shadow-sm p-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-5">Votre commande</h2>
            <ul className="space-y-3 mb-5 pb-5 border-b border-orange-50">
              {cart.map((item) => (
                <li key={item.id} className="flex justify-between items-start gap-2 text-sm">
                  <div className="flex-1 min-w-0"><span className="text-gray-700 font-medium line-clamp-1">{item.name}</span><span className="text-gray-400 text-xs"> ×{item.quantity}</span></div>
                  <span className="font-semibold text-gray-900 flex-shrink-0">{(item.price * item.quantity).toFixed(2)}€</span>
                </li>
              ))}
            </ul>
            <div className="space-y-3 mb-5 pb-5 border-b border-orange-50 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Sous-total</span><span className="font-semibold text-gray-900">{cartTotal.toFixed(2)}€</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Livraison</span><span className="font-semibold text-green-600">Gratuite</span></div>
              <div className="flex justify-between"><span className="text-gray-500">TVA (20%)</span><span className="font-semibold text-gray-900">{(cartTotal * 0.2).toFixed(2)}€</span></div>
            </div>
            <div className="flex justify-between mb-5">
              <span className="font-bold text-gray-900">Total TTC</span>
              <span className="font-extrabold text-orange-700 text-lg font-rubik">{(cartTotal * 1.2).toFixed(2)}€</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
              Paiement 100% sécurisé par chiffrement SSL
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
