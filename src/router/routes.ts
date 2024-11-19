export const PublicRoutes = {
  HOME: '/',
  TRADES: '/trades',
  ASSETS: {
    ROOT: '/assets',
    DETAILS: (issuer: string, assetName: string) => `/assets/${issuer}/${assetName}`
  },
  TRANSACTIONS: '/transactions',
  ENTITY: (entity: string) => `/entities/${entity}`,
  NOT_FOUND: '/404'
} as const

export default PublicRoutes
