import { useTranslation } from 'react-i18next'

import { withHelmet } from '@app/components/hocs'
import { PageLayout } from '@app/components/ui/layouts'
import { useGetTradesQuery } from '@app/store/apis/qx'
import { formatRTKError } from '@app/utils/rtk'
import { TradesTable } from './components'

function TradesPage() {
  const { t } = useTranslation()
  const { data, isFetching, error } = useGetTradesQuery()

  return (
    <PageLayout title={t('trades_page.qx_trades')} error={error && formatRTKError(error)}>
      <TradesTable trades={data} isLoading={isFetching} isMobile={false} />
    </PageLayout>
  )
}

const TradesPageWithHelmet = withHelmet(TradesPage, {
  title: 'Trades | Qx',
  meta: [{ name: 'description', content: 'Check latest trades on Qx' }]
})

export default TradesPageWithHelmet
