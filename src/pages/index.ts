import { lazy } from 'react'

export { default as Error404Page } from './404/Error404Page'
export { default as HomePage } from './home/HomePage'

export const AssetsPageLazy = lazy(() => import('./assets/AssetsPage'))
export const AssetPageLazy = lazy(() => import('./assets/AssetPage'))
export const TradesPageLazy = lazy(() => import('./trades/TradesPage'))
export const TransactionsPageLazy = lazy(() => import('./transactions/TransactionsPage'))
export const EntityPageLazy = lazy(() => import('./entities/EntityPage'))
