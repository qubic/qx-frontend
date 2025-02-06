import { useTranslation } from 'react-i18next'

import type { EntityOrderWithType } from '../types'

import EntityOrdersTable from './EntityOrdersTable'

type Props = {
  orders: EntityOrderWithType[]
  isFetching: boolean
  isError: boolean
}

export default function EntityOwnerOrders({ orders, isFetching, isError }: Props) {
  const { t } = useTranslation()

  return (
    <section className="grid gap-24">
      <h2 className="text-center text-xl font-bold">{t('entity_page.open_orders')}</h2>
      <EntityOrdersTable
        entityOrders={orders}
        isLoading={isFetching}
        hasError={isError}
        isEntityOwner
      />
    </section>
  )
}
