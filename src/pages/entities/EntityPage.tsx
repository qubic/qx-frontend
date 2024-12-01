import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { ExplorerIcon } from '@app/assets/icons'
import { withHelmet } from '@app/components/hocs'
import { TradesTable, TransfersTable } from '@app/components/tables'
import { PageLayout } from '@app/components/ui/layouts'
import { ExplorerLink } from '@app/components/ui/links'
import {
  useGetEntityAskOrdersQuery,
  useGetEntityBidOrdersQuery,
  useGetEntityTradesQuery,
  useGetEntityTransfersQuery
} from '@app/store/apis/qx'
import { ExplorerLinkType } from '@app/types/enums'
import { EntityOrdersTable } from './components'

function EntityPage() {
  const { entity = '' } = useParams()
  const { t } = useTranslation()

  const bidOrders = useGetEntityBidOrdersQuery({ entity }, { skip: !entity })
  const askOrders = useGetEntityAskOrdersQuery({ entity }, { skip: !entity })
  const trades = useGetEntityTradesQuery({ entity }, { skip: !entity })
  const transfers = useGetEntityTransfersQuery({ entity }, { skip: !entity })

  return (
    <PageLayout title="Entity Info">
      <section className="grid w-[85vw] max-w-2xl text-sm">
        <div className="flex gap-8 border-y-1 border-primary-60 py-12">
          <p className="text-slate-500">{t('global.address')}</p>
          <p className="break-all text-xxs xs:text-xs sm:text-sm">{entity}</p>
          <ExplorerLink
            type={ExplorerLinkType.ADDRESS}
            value={entity}
            label={<ExplorerIcon className="size-20 text-primary-25" />}
            showTooltip
            tooltipContent={t('global.check_on_explorer')}
          />
        </div>
      </section>
      <section className="grid w-[85vw] max-w-2xl gap-24 md:grid-cols-2">
        <section className="flex flex-col gap-24">
          <h2 className="text-center text-xl font-bold">{t('entity_page.open_ask_orders')}</h2>
          <EntityOrdersTable
            entityOrders={bidOrders.data}
            isLoading={bidOrders.isFetching}
            hasError={bidOrders.isError}
          />
        </section>
        <section className="flex flex-col gap-24">
          <h2 className="text-center text-xl font-bold">{t('entity_page.open_bid_orders')}</h2>
          <EntityOrdersTable
            entityOrders={askOrders.data}
            isLoading={askOrders.isFetching}
            hasError={askOrders.isError}
          />
        </section>
      </section>
      <section className="grid gap-24">
        <h2 className="text-center text-xl font-bold">{t('global.trades')}</h2>
        <TradesTable trades={trades.data} isLoading={trades.isFetching} hasError={trades.isError} />
      </section>
      <section className="grid gap-24">
        <h2 className="text-center text-xl font-bold">{t('global.asset_transfers')}</h2>
        <TransfersTable
          transfers={transfers.data}
          isLoading={transfers.isFetching}
          hasError={transfers.isError}
        />
      </section>
    </PageLayout>
  )
}

const EntityPageWithHelmet = withHelmet(EntityPage, {
  title: 'Entity | Qx'
})

export default EntityPageWithHelmet
