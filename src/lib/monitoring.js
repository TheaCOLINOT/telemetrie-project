// import * as Sentry from '@sentry/react'

// export function initMonitoring() {
//   const dsn = import.meta.env.VITE_GLITCHTIP_DSN
//   if (!dsn) {
//     if (import.meta.env.DEV) {
//       console.info('[Monitoring] VITE_GLITCHTIP_DSN non défini — error tracking désactivé')
//     }
//     return
//   }

//   Sentry.init({
//     dsn,
//     environment: import.meta.env.MODE,
//     release: import.meta.env.VITE_APP_VERSION ?? '0.0.1',
//     tracesSampleRate: 1.0,
//     replaysSessionSampleRate: 0,
//     replaysOnErrorSampleRate: 0,
//   })
// }

// export { Sentry }
