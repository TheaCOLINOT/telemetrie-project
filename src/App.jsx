import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { Sentry } from './lib/sentry'
import { CartProvider } from './contexts/CartContext'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import NotFound from './pages/NotFound'
import { captureUTM } from './lib/utm'
import { analytics } from './lib/analytics'

const SentryRoutes = Sentry.withSentryReactRouterV6Routing(Routes)

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function UTMTracker() {
  useEffect(() => {
    const utm = captureUTM()
    if (!utm.utm_source) return

    const send = () => {
      if (window.umami?.track) {
        analytics.utmVisit(utm)
      } else {
        setTimeout(send, 300)
      }
    }
    send()
  }, [])
  return null
}

function UmamiPageTracker() {
  const { pathname } = useLocation()
  useEffect(() => {
    if (typeof window !== 'undefined' && window.umami?.track) {
      window.umami.track({ url: pathname })
    }
  }, [pathname])
  return null
}

export default function App() {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <UTMTracker />
        <UmamiPageTracker />
        <div className="flex flex-col min-h-screen bg-orange-50">
          <Header />
          <main className="flex-grow">
            <SentryRoutes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="*" element={<NotFound />} />
            </SentryRoutes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  )
}
