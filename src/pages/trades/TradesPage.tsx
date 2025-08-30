import { useTranslation } from 'react-i18next'

import { withHelmet } from '@app/components/hocs'
import { TradesTable } from '@app/components/tables'
import { PageLayout } from '@app/components/ui/layouts'
import { useGetSmartContractTradesQuery, useGetTokenTradesQuery } from '@app/store/apis/qx'

function TradesPage() {
  const { t } = useTranslation()
  const {
    data: scTrades = [],
    isFetching: isScTradesFetching,
    isError: isScTradesError
  } = useGetSmartContractTradesQuery()
  const {
    data: tokenTrades = [],
    isFetching: isTokenTradesFetching,
    isError: isTokenTradesError
  } = useGetTokenTradesQuery()

  return (
    <PageLayout title={t('trades_page.qx_trades')}>
      <section className="grid gap-24">
        <h2 className="text-center text-xl font-semibold">{t('global.smart_contract_shares')}</h2>
        <TradesTable trades={scTrades} isLoading={isScTradesFetching} hasError={isScTradesError} />
      </section>
      <section className="grid gap-24">
        <h2 className="text-center text-xl font-semibold">{t('global.tokens')}</h2>
        <TradesTable
          trades={tokenTrades}
          isLoading={isTokenTradesFetching}
          hasError={isTokenTradesError}
        />
      </section>
    </PageLayout>
  )
}

const TradesPageWithHelmet = withHelmet(TradesPage, {
  title: 'Trades | Qx',
  meta: [{ name: 'description', content: 'Check latest trades on Qx' }]
})

export default TradesPageWithHelmet
