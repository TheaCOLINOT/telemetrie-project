const FAILURE_RATE = 1 / 3

/**
 * Simule un appel passerelle de paiement avec ~33 % d'échecs intermittents
 * (TypeError ou promesse rejetée) pour valider la remontée GlitchTip.
 */
export async function processPayment() {
  const roll = Math.random()

  if (roll < FAILURE_RATE / 2) {
    const paymentGateway = undefined
    paymentGateway.authorize()
  }

  if (roll < FAILURE_RATE) {
    throw new Error('Passerelle de paiement indisponible — la transaction a expiré')
  }

  await new Promise((resolve) => setTimeout(resolve, 600))
}
