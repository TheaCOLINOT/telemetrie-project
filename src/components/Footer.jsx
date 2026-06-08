export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-800 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">ShopHub</h3>
            <p className="text-gray-400">
              Votre boutique en ligne de confiance pour les meilleures affaires.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Liens rapides</h3>
            <ul className="text-gray-400 space-y-2">
              <li><a href="/" className="hover:text-white transition">Accueil</a></li>
              <li><a href="/products" className="hover:text-white transition">Produits</a></li>
              <li><a href="/" className="hover:text-white transition">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Nous contacter</h3>
            <p className="text-gray-400">Email: contact@shophub.fr</p>
            <p className="text-gray-400">Téléphone: +33 (0)1 23 45 67 89</p>
          </div>
        </div>
        <hr className="border-gray-700 my-8" />
        <p className="text-center text-gray-400">
          © {currentYear} ShopHub. Tous les droits réservés.
        </p>
      </div>
    </footer>
  )
}
