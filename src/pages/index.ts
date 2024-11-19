import { lazy } from 'react'

export { default as Error404Page } from './404/Error404Page'
export { default as HomePage } from './home/HomePage'

export const AssetsPageLazy = lazy(() => import('./assets/AssetsPage'))
export const TradesPageLazy = lazy(() => import('./trades/TradesPage'))
export const TransactionsPageLazy = lazy(() => import('./transactions/TransactionsPage'))
