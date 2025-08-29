import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { withHelmet } from '@app/components/hocs'
import { TradesTable } from '@app/components/tables'
import { PageLayout } from '@app/components/ui/layouts'
import { type Trade, useGetTradesQuery } from '@app/store/apis/qx'
import { ASSETS_ISSUER_ADDRESS } from '@app/utils/qubic'

function TradesPage() {
  const { t } = useTranslation()
  const { data: trades = [], isFetching, isError } = useGetTradesQuery()

  // TODO implement two calls: one for smart contracts and one for tokens because there are only few smart contract trades
  const { smartContractShares, tokens } = useMemo(
    () =>
      trades.reduce(
        (acc: { smartContractShares: Trade[]; tokens: Trade[] }, trade) => {
          const key = trade.issuer === ASSETS_ISSUER_ADDRESS ? 'smartContractShares' : 'tokens'
          acc[key].push(trade)
          return acc
        },
        { smartContractShares: [], tokens: [] }
      ),
    [trades]
  )

  return (
    <PageLayout title={t('trades_page.qx_trades')}>
      <section className="grid gap-24">
        <h2 className="text-center text-xl font-semibold">{t('global.smart_contract_shares')}</h2>
        <TradesTable trades={smartContractShares} isLoading={isFetching} hasError={isError} />
      </section>
      <section className="grid gap-24">
        <h2 className="text-center text-xl font-semibold">{t('global.tokens')}</h2>
        <TradesTable trades={tokens} isLoading={isFetching} hasError={isError} />
      </section>
    </PageLayout>
  )
}

const TradesPageWithHelmet = withHelmet(TradesPage, {
  title: 'Trades | Qx',
  meta: [{ name: 'description', content: 'Check latest trades on Qx' }]
})

export default TradesPageWithHelmet
