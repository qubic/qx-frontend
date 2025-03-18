export const LogFeature = {
  WALLET_CONNECT_CLIENT: 'WALLET_CONNECT_CLIENT',
  WALLET_CONNECT_CONTEXT: 'WALLET_CONNECT_CONTEXT',
  TRADE_MODAL: 'TRADE_MODAL',
  REMOVE_ORDER_MODAL: 'REMOVE_ORDER_MODAL'
} as const

const enabledLogs: (typeof LogFeature)[keyof typeof LogFeature][] = [
  LogFeature.WALLET_CONNECT_CLIENT,
  LogFeature.WALLET_CONNECT_CONTEXT,
  LogFeature.TRADE_MODAL,
  LogFeature.REMOVE_ORDER_MODAL
]

export const makeLog =
  (feature: keyof typeof LogFeature) =>
  (...args: Parameters<typeof console.log>) => {
    if (import.meta.env.MODE === 'development' && enabledLogs.includes(feature)) {
      // eslint-disable-next-line no-console -- expected logger
      console.log(`[${feature}] - `, ...args)
    }
  }
