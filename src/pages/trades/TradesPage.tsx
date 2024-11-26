import { useTranslation } from 'react-i18next'

import { withHelmet } from '@app/components/hocs'
import { TradesTable } from '@app/components/tables'
import { PageLayout } from '@app/components/ui/layouts'
import { useGetTradesQuery } from '@app/store/apis/qx'

function TradesPage() {
  const { t } = useTranslation()
  const { data, isFetching, isError } = useGetTradesQuery()

  return (
    <PageLayout title={t('trades_page.qx_trades')}>
      <TradesTable trades={data} isLoading={isFetching} hasError={isError} />
    </PageLayout>
  )
}

const TradesPageWithHelmet = withHelmet(TradesPage, {
  title: 'Trades | Qx',
  meta: [{ name: 'description', content: 'Check latest trades on Qx' }]
})

export default TradesPageWithHelmet
