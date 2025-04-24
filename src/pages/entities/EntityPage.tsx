import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { ExplorerIcon } from '@app/assets/icons'
import { withHelmet } from '@app/components/hocs'
import { TradesTable, TransfersTable } from '@app/components/tables'
import { PageLayout } from '@app/components/ui/layouts'
import { ExplorerLink } from '@app/components/ui/links'
import { useWalletConnect } from '@app/hooks'
import {
  useGetEntityAskOrdersQuery,
  useGetEntityBidOrdersQuery,
  useGetEntityTradesQuery,
  useGetEntityTransfersQuery
} from '@app/store/apis/qx'
import { ExplorerLinkType, OrderType } from '@app/types/enums'

import { EntityOwnerOrders, PublicEntityOrders } from './components'

function EntityPage() {
  const { entity = '' } = useParams()
  const { t } = useTranslation()

  const { isWalletConnected, selectedAccount } = useWalletConnect()

  const bidOrders = useGetEntityBidOrdersQuery({ entity }, { skip: !entity })
  const askOrders = useGetEntityAskOrdersQuery({ entity }, { skip: !entity })
  const trades = useGetEntityTradesQuery({ entity }, { skip: !entity })
  const transfers = useGetEntityTransfersQuery({ entity }, { skip: !entity })

  const isEntityOwner = useMemo(
    () => isWalletConnected && selectedAccount?.address === entity,
    [isWalletConnected, selectedAccount, entity]
  )

  const orders = useMemo(() => {
    if (!askOrders.data && !bidOrders.data) {
      return {
        askOrdersWithType: [],
        bidOrdersWithType: [],
        aggregatedOrders: []
      }
    }
    const askOrdersWithType =
      askOrders.data?.map((order) => ({ ...order, orderType: OrderType.ASK })) ?? []

    const bidOrdersWithType =
      bidOrders.data?.map((order) => ({ ...order, orderType: OrderType.BID })) ?? []

    const aggregatedOrders = [...askOrdersWithType, ...bidOrdersWithType].sort(
      (a, b) => b.numberOfShares * b.price - a.numberOfShares * a.price
    )

    return { askOrdersWithType, bidOrdersWithType, aggregatedOrders }
  }, [askOrders.data, bidOrders.data])

  const renderEntityOrders = useCallback(
    () =>
      isEntityOwner ? (
        <EntityOwnerOrders
          orders={orders.aggregatedOrders}
          isFetching={askOrders.isFetching || bidOrders.isFetching}
          isError={askOrders.isError || bidOrders.isError}
        />
      ) : (
        <PublicEntityOrders
          askOrders={{
            data: orders.askOrdersWithType,
            isFetching: askOrders.isFetching,
            isError: askOrders.isError
          }}
          bidOrders={{
            data: orders.bidOrdersWithType,
            isFetching: bidOrders.isFetching,
            isError: bidOrders.isError
          }}
        />
      ),
    [
      askOrders.isError,
      askOrders.isFetching,
      bidOrders.isError,
      bidOrders.isFetching,
      isEntityOwner,
      orders.aggregatedOrders,
      orders.askOrdersWithType,
      orders.bidOrdersWithType
    ]
  )

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

      {renderEntityOrders()}

      <section className="grid gap-24">
        <h2 className="text-center text-xl font-bold">{t('global.trades')}</h2>
        <TradesTable
          trades={trades.data}
          isLoading={trades.isFetching}
          hasError={trades.isError}
          entityId={entity}
        />
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
