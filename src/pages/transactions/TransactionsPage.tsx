import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { withHelmet } from '@app/components/hocs'
import { TransfersTable } from '@app/components/tables'
import { PageLayout } from '@app/components/ui/layouts'
import { useGetIssuedAssetsQuery, useGetTransfersQuery } from '@app/store/apis/qx'

import { IssuedAssetsTable } from './components'

function TransactionsPage() {
  const { t } = useTranslation()
  const {
    data: transfers,
    isFetching: isTransfersLoading,
    isError: isTransfersError
  } = useGetTransfersQuery()
  const {
    data: issuedAssets,
    isFetching: isIssuedAssetsLoading,
    isError: isIssuedAssetsError
  } = useGetIssuedAssetsQuery()

  const latestIssuedAssets = useMemo(() => issuedAssets?.slice(0, 10), [issuedAssets])
  const latestTransfers = useMemo(() => transfers?.slice(0, 25), [transfers])

  return (
    <PageLayout>
      <section className="grid gap-24">
        <h2 className="text-center text-2xl font-bold">
          {t('transactions_page.latest_issued_assets')}
        </h2>
        <IssuedAssetsTable
          issuedAssets={latestIssuedAssets}
          isLoading={isIssuedAssetsLoading}
          hasError={isIssuedAssetsError}
        />
      </section>
      <section className="grid gap-24">
        <h2 className="text-center text-2xl font-bold">
          {t('transactions_page.latest_asset_transfers')}
        </h2>
        <TransfersTable
          transfers={latestTransfers}
          isLoading={isTransfersLoading}
          hasError={isTransfersError}
        />
      </section>
    </PageLayout>
  )
}

const TransactionsPageWithHelmet = withHelmet(TransactionsPage, {
  title: 'Transactions | Qx',
  meta: [{ name: 'description', content: 'Check latest transactions on Qx' }]
})

export default TransactionsPageWithHelmet
