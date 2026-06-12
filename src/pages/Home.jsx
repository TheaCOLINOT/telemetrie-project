import { Link } from 'react-router-dom'

const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
    color: 'bg-orange-100 text-orange-600',
    title: 'Livraison rapide',
    desc: "Livraison gratuite dès 50€ d'achat. Expédié sous 24h.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    color: 'bg-amber-100 text-amber-600',
    title: 'Paiements sécurisés',
    desc: 'Transactions chiffrées SSL. Vos données bancaires sont protégées.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
    color: 'bg-rose-100 text-rose-600',
    title: 'Support 24/7',
    desc: 'Notre équipe est disponible à tout moment pour vous aider.',
  },
]

export default function Home() {
  return (
    <div>
      <section
        className="relative overflow-hidden py-32 px-4 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero.png')" }}
      >
        <div className="absolute inset-0 bg-black/70 pointer-events-none" aria-hidden="true" />
        <div className="container mx-auto max-w-3xl text-center relative">
          <h1 className="text-5xl sm:text-6xl font-regular text-white mb-5 leading-tight tracking-tight">
            Bienvenue chez{' '}
            <span className="text-transparent bg-clip-text font-extrabold text-white">ShopHub</span>
          </h1>
          <p className="text-lg text-white/75 mb-10 max-w-xl mx-auto leading-relaxed">
            Découvrez notre sélection de produits tech de qualité à des prix imbattables.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/products" className="inline-flex items-center justify-center gap-2 bg-orange-600 text-white px-8 py-3.5 rounded-xl hover:bg-orange-500 transition-all duration-200 text-base font-semibold shadow-lg shadow-black/30 cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-black/50">
              Voir les produits
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Pourquoi nous choisir ?</h2>
          <p className="text-gray-500 max-w-md mx-auto">Des avantages pensés pour vous offrir la meilleure expérience d'achat.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map(({ icon, color, title, desc }) => (
            <div key={title} className="bg-white/70 backdrop-blur-sm border border-orange-100/60 p-8 rounded-2xl shadow-sm hover:shadow-md hover:shadow-orange-100/50 transition-all duration-300 text-center group cursor-default">
              <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-200`}>
                {icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
