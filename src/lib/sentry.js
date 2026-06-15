import { useEffect } from 'react'
import * as Sentry from '@sentry/react'
import {
  useLocation,
  useNavigationType,
  createRoutesFromChildren,
  matchRoutes,
} from 'react-router-dom'

export function initSentry() {
  const dsn = import.meta.env.VITE_GLITCHTIP_DSN

  if (!dsn) {
    console.warn('[GlitchTip] VITE_GLITCHTIP_DSN non défini — télémétrie désactivée')
    return
  }

  Sentry.init({
    dsn,
    environment: import.meta.env.MODE,
    release: 'ecommerce-react@0.0.1',
    autoSessionTracking: false,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.reactRouterV6BrowserTracingIntegration({
        useEffect,
        useLocation,
        useNavigationType,
        createRoutesFromChildren,
        matchRoutes,
      }),
    ],
    tracesSampleRate: import.meta.env.PROD ? 0.2 : 1.0,
    ignoreErrors: [
      'ResizeObserver loop limit exceeded',
      'Network Error',
    ],
  })
}

export { Sentry }
