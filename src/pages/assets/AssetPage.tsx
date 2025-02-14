import type { SingleValueData } from 'lightweight-charts'
import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { withHelmet } from '@app/components/hocs'
import type { OrderPayload } from '@app/components/modals/TradeModal/trade-modal.types'
import { TradesTable, TransfersTable } from '@app/components/tables'
import { LightweightChart } from '@app/components/ui'
import { PageLayout } from '@app/components/ui/layouts'
import { EntityLink } from '@app/components/ui/links'
import { useAppDispatch, useWalletConnect } from '@app/hooks'
import {
  useGetAssetAskOrdersQuery,
  useGetAssetBidOrdersQuery,
  useGetAssetChartAveragePriceQuery,
  useGetAssetTradesQuery,
  useGetAssetTransfersQuery
} from '@app/store/apis/qx'
import { ModalType, showModal } from '@app/store/modalSlice'
import { OrderType } from '@app/types/enums'

import { AssetOrdersTable } from './components'

function AssetPage() {
  const { assetIssuer = '', assetName = '' } = useParams()
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const { isWalletConnected } = useWalletConnect()

  const commonArgs = useMemo(
    () => ({ issuer: assetIssuer, asset: assetName }),
    [assetIssuer, assetName]
  )
  const commonOptions = { skip: !assetIssuer || !assetName }

  const askOrders = useGetAssetAskOrdersQuery(commonArgs, commonOptions)
  const bidOrders = useGetAssetBidOrdersQuery(commonArgs, commonOptions)
  const trades = useGetAssetTradesQuery(commonArgs, commonOptions)
  const transfers = useGetAssetTransfersQuery(commonArgs, commonOptions)
  const averagePrices = useGetAssetChartAveragePriceQuery(commonArgs, commonOptions)

  const avgPriceData: SingleValueData[] = useMemo(
    () => averagePrices.data?.map((v) => ({ value: v.averagePrice, time: v.time })) ?? [],
    [averagePrices]
  )

  const histogramVolumeData: SingleValueData[] = useMemo(
    () => averagePrices.data?.map((v) => ({ value: v.totalAmount, time: v.time })) ?? [],
    [averagePrices]
  )

  const shouldDisplayChart = useMemo(
    () => (averagePrices.data?.length ?? 0) > 1,
    [averagePrices.data]
  )

  const handleRowActionClick = useCallback(
    (orderType: OrderType) => (orderPayload: OrderPayload) => {
      if (!isWalletConnected) {
        dispatch(showModal({ modalType: ModalType.CONNECT_WALLET }))
      } else {
        dispatch(
          showModal({
            modalType: ModalType.CONFIRM_TRADE,
            modalProps: { orderType, orderPath: commonArgs, orderPayload }
          })
        )
      }
    },
    [commonArgs, dispatch, isWalletConnected]
  )

  return (
    <PageLayout title={t('asset_page.asset_order_book', { asset: assetName })}>
      <section className="grid w-[85vw] max-w-2xl text-sm">
        <div className="flex gap-8 border-y-1 border-primary-60 py-12">
          <p className="text-slate-500">{t('global.name')}</p>
          <p>{assetName}</p>
        </div>
        <div className="flex gap-8 border-b-1 border-primary-60 py-12">
          <p className="text-slate-500">{t('global.issuer')}</p>
          <EntityLink value={assetIssuer} className="sm:text-sm" />
        </div>
      </section>

      {shouldDisplayChart && (
        <section className="mt-12 grid gap-24">
          <h2 className="text-center text-xl font-bold">{t('global.chart_avg_price')}</h2>
          <LightweightChart
            priceDataSeries={avgPriceData}
            volumeDataSeries={histogramVolumeData}
            className="w-[85vw] max-w-2xl"
          />
        </section>
      )}

      <section className="grid w-[85vw] max-w-2xl gap-24 md:grid-cols-2">
        <section className="flex w-[85vw] max-w-2xl flex-col gap-24 md:w-full">
          <h2 className="text-center text-xl font-bold">{t('entity_page.open_ask_orders')}</h2>
          <AssetOrdersTable
            assetOrders={askOrders.data}
            ordersType={OrderType.ASK}
            onRowActionClick={handleRowActionClick(OrderType.ASK)}
            isLoading={askOrders.isFetching}
            hasError={askOrders.isError}
          />
        </section>
        <section className="flex w-[85vw] max-w-2xl flex-col gap-24 md:w-full">
          <h2 className="text-center text-xl font-bold">{t('entity_page.open_bid_orders')}</h2>
          <AssetOrdersTable
            assetOrders={bidOrders.data}
            ordersType={OrderType.BID}
            onRowActionClick={handleRowActionClick(OrderType.BID)}
            isLoading={bidOrders.isFetching}
            hasError={bidOrders.isError}
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

const AssetPageWithHelmet = withHelmet(AssetPage, {
  title: 'Asset | Qx'
})

export default AssetPageWithHelmet
