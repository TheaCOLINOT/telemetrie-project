import { Component } from 'react'
import { Link } from 'react-router-dom'
import { Sentry } from '../lib/monitoring'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, eventId: null }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    const eventId = Sentry.captureException(error, {
      extra: { componentStack: info.componentStack },
    })
    this.setState({ eventId })
  }

  render() {
    if (!this.state.hasError) return this.props.children

    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-orange-50">
        <div className="max-w-md w-full bg-white/80 backdrop-blur-sm rounded-2xl border border-orange-100/60 shadow-sm p-10 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">Une erreur est survenue</h1>
          <p className="text-gray-500 text-sm mb-1">
            L'erreur a été signalée automatiquement à notre équipe.
          </p>
          {this.state.eventId && (
            <p className="text-xs text-gray-400 mb-6 font-mono">Réf : {this.state.eventId}</p>
          )}
          <Link
            to="/"
            onClick={() => this.setState({ hasError: false, eventId: null })}
            className="inline-flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-xl hover:bg-orange-700 transition-colors font-semibold cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    )
  }
}
