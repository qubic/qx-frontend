import type { SingleValueData } from 'lightweight-charts'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { withHelmet } from '@app/components/hocs'
import { TradesTable, TransfersTable } from '@app/components/tables'
import { LightweightChart } from '@app/components/ui'
import { PageLayout } from '@app/components/ui/layouts'
import { ExplorerLink } from '@app/components/ui/links'
import {
  useGetAssetAskOrdersQuery,
  useGetAssetBidOrdersQuery,
  useGetAssetChartAveragePriceQuery,
  useGetAssetTradesQuery,
  useGetAssetTransfersQuery
} from '@app/store/apis/qx'
import { ExplorerLinkType } from '@app/types/enums'
import { AssetOrdersTable } from './components'

function AssetPage() {
  const { assetIssuer = '', assetName = '' } = useParams()
  const { t } = useTranslation()

  const commonArgs = { issuer: assetIssuer, asset: assetName }
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

  return (
    <PageLayout title={t('asset_page.asset_order_book', { asset: assetName })}>
      <section className="grid w-[85vw] max-w-2xl text-sm">
        <div className="flex gap-8 border-y-1 border-primary-60 py-12">
          <p className="text-slate-500">{t('global.name')}</p>
          <p>{assetName}</p>
        </div>
        <div className="flex gap-8 border-b-1 border-primary-60 py-12">
          <p className="text-slate-500">{t('global.issuer')}</p>
          <ExplorerLink
            type={ExplorerLinkType.ADDRESS}
            value={assetIssuer}
            className="xs:text-sm"
            showTooltip
            tooltipContent={t('global.check_on_explorer')}
          />
        </div>
      </section>

      {Boolean(averagePrices.data?.length) && (
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
        <section className="flex flex-col gap-24">
          <h2 className="text-center text-xl font-bold">{t('entity_page.open_ask_orders')}</h2>
          <AssetOrdersTable
            assetOrders={bidOrders.data}
            isLoading={bidOrders.isFetching}
            hasError={bidOrders.isError}
          />
        </section>
        <section className="flex flex-col gap-24">
          <h2 className="text-center text-xl font-bold">{t('entity_page.open_bid_orders')}</h2>
          <AssetOrdersTable
            assetOrders={askOrders.data}
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

const AssetPageWithHelmet = withHelmet(AssetPage, {
  title: 'Asset | Qx'
})

export default AssetPageWithHelmet
