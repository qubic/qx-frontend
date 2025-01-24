import { useTranslation } from 'react-i18next'

import type { EntityOrderWithType } from '../types'

import EntityOrdersTable from './EntityOrdersTable'

type Props = {
  askOrders: {
    data: EntityOrderWithType[]
    isFetching: boolean
    isError: boolean
  }
  bidOrders: {
    data: EntityOrderWithType[]
    isFetching: boolean
    isError: boolean
  }
}

export default function PublicEntityOrders({ askOrders, bidOrders }: Props) {
  const { t } = useTranslation()

  return (
    <section className="grid w-[85vw] max-w-2xl gap-24 md:grid-cols-2">
      <section className="flex flex-col gap-24">
        <h2 className="text-center text-xl font-bold">{t('entity_page.open_ask_orders')}</h2>
        <EntityOrdersTable
          entityOrders={askOrders.data}
          isLoading={askOrders.isFetching}
          hasError={askOrders.isError}
          isEntityOwner={false}
        />
      </section>
      <section className="flex flex-col gap-24">
        <h2 className="text-center text-xl font-bold">{t('entity_page.open_bid_orders')}</h2>
        <EntityOrdersTable
          entityOrders={bidOrders.data}
          isLoading={bidOrders.isFetching}
          hasError={bidOrders.isError}
          isEntityOwner={false}
        />
      </section>
    </section>
  )
}
