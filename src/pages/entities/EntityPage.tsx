import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { withHelmet } from '@app/components/hocs'
import { TradesTable, TransfersTable } from '@app/components/tables'
import { PageLayout } from '@app/components/ui/layouts'
import {
  useGetEntityAskOrdersQuery,
  useGetEntityBidOrdersQuery,
  useGetEntityTradesQuery,
  useGetEntityTransfersQuery
} from '@app/store/apis/qx'
import { EntityOrdersTable } from './components'

function EntityPage() {
  const { entity = '' } = useParams()
  const { t } = useTranslation()
  const {
    data: bidOrders,
    isFetching: isBidOrdersLoading,
    isError: isBidOrdersError
  } = useGetEntityBidOrdersQuery({ entity }, { skip: !entity })
  const {
    data: askOrders,
    isFetching: isAskOrdersLoading,
    isError: isAskOrdersError
  } = useGetEntityAskOrdersQuery({ entity }, { skip: !entity })
  const {
    data: trades,
    isFetching: isTradesLoading,
    isError: isTradesError
  } = useGetEntityTradesQuery({ entity }, { skip: !entity })
  const {
    data: transfers,
    isFetching: isTransfersLoading,
    isError: isTransfersError
  } = useGetEntityTransfersQuery({ entity }, { skip: !entity })

  return (
    <PageLayout title="Entity Info">
      <section className="grid w-[85vw] max-w-2xl gap-24 md:grid-cols-2">
        <section className="flex flex-col gap-24">
          <h2 className="text-center text-xl font-bold">{t('entity_page.open_ask_orders')}</h2>
          <EntityOrdersTable
            entityOrders={bidOrders}
            isLoading={isBidOrdersLoading}
            hasError={isBidOrdersError}
          />
        </section>
        <section className="flex flex-col gap-24">
          <h2 className="text-center text-xl font-bold">{t('entity_page.open_bid_orders')}</h2>
          <EntityOrdersTable
            entityOrders={askOrders}
            isLoading={isAskOrdersLoading}
            hasError={isAskOrdersError}
          />
        </section>
      </section>
      <section className="grid gap-24">
        <h2 className="text-center text-xl font-bold">{t('global.trades')}</h2>
        <TradesTable trades={trades} isLoading={isTradesLoading} hasError={isTradesError} />
      </section>
      <section className="grid gap-24">
        <h2 className="text-center text-xl font-bold">{t('global.asset_transfers')}</h2>
        <TransfersTable
          transfers={transfers}
          isLoading={isTransfersLoading}
          hasError={isTransfersError}
        />
      </section>
    </PageLayout>
  )
}

const EntityPageWithHelmet = withHelmet(EntityPage, {
  title: 'Entity | Qx'
})

export default EntityPageWithHelmet
