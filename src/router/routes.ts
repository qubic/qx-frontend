export const PublicRoutes = {
  HOME: '/',
  TRADES: '/trades',
  ASSETS: {
    ROOT: '/qx-assets',
    DETAILS: (issuer: string, assetName: string) => `/assets/${issuer}/${assetName}`
  },
  TRANSACTIONS: '/transactions',
  ENTITIES: {
    DETAILS: (entity: string) => `/entities/${entity}`
  },
  NOT_FOUND: '/404'
} as const

export default PublicRoutes
