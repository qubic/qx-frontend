import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from '@app/components/ui/layouts'
import {
  AssetPageLazy,
  AssetsPageLazy,
  EntityPageLazy,
  Error404Page,
  HomePage,
  TradesPageLazy,
  TransactionsPageLazy
} from '@app/pages'
import { PublicRoutes } from './routes'

const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter([
  {
    path: PublicRoutes.HOME,
    element: <AppLayout />,
    errorElement: <Error404Page />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: PublicRoutes.ASSETS.ROOT,
        element: <AssetsPageLazy />
      },
      {
        path: PublicRoutes.ASSETS.DETAILS(':assetIssuer', ':assetName'),
        element: <AssetPageLazy />
      },
      {
        path: PublicRoutes.TRADES,
        element: <TradesPageLazy />
      },
      {
        path: PublicRoutes.TRANSACTIONS,
        element: <TransactionsPageLazy />
      },
      {
        path: PublicRoutes.ENTITIES.DETAILS(':entity'),
        element: <EntityPageLazy />
      }
    ]
  },
  {
    path: PublicRoutes.NOT_FOUND,
    element: <Error404Page />
  }
])

export default router
