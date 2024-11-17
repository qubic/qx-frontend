import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from '@app/components/ui/layouts'
import { Error404Page, HomePage } from '@app/pages'
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
      }
    ]
  },
  {
    path: PublicRoutes.NOT_FOUND,
    element: <Error404Page />
  }
])

export default router
