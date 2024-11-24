import { useTranslation } from 'react-i18next'

import { withHelmet } from '@app/components/hocs'
import { PageLayout } from '@app/components/ui/layouts'
import { useGetTransfersQuery } from '@app/store/apis/qx'
import { formatRTKError } from '@app/utils/rtk'
import { useMemo } from 'react'
import { TransfersTable } from './components'

function TransactionsPage() {
  const { t } = useTranslation()
  const { data, isFetching, error } = useGetTransfersQuery()

  const latestTransfers = useMemo(() => data?.filter((tx) => tx.moneyFlew).slice(0, 25), [data])

  return (
    <PageLayout error={error && formatRTKError(error)}>
      <section className="grid gap-24">
        <h2 className="text-center text-2xl font-bold">
          {t('transactions_page.latest_asset_transfers')}
        </h2>
        <TransfersTable transfers={latestTransfers} isLoading={isFetching} isMobile={false} />
      </section>
    </PageLayout>
  )
}

const TransactionsPageWithHelmet = withHelmet(TransactionsPage, {
  title: 'Transactions | Qx',
  meta: [{ name: 'description', content: 'Check latest transactions on Qx' }]
})

export default TransactionsPageWithHelmet
