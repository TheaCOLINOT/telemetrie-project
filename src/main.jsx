import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { initSentry, Sentry } from './lib/sentry'
import './index.css'

initSentry()

const SentryApp = Sentry.withErrorBoundary(App, {
  fallback: ({ resetError }) => (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl border border-orange-100 shadow-sm p-8 max-w-md text-center">
        <h1 className="text-xl font-bold text-gray-900 mb-2">Une erreur est survenue</h1>
        <p className="text-gray-500 text-sm mb-6">
          L'application a rencontré un problème inattendu. L'incident a été signalé à GlitchTip.
        </p>
        <button
          type="button"
          onClick={resetError}
          className="bg-orange-600 text-white px-6 py-2.5 rounded-xl hover:bg-orange-700 transition-colors font-semibold"
        >
          Réessayer
        </button>
      </div>
    </div>
  ),
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SentryApp />
  </React.StrictMode>,
)
