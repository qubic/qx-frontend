import { useTranslation } from 'react-i18next'

import { withHelmet } from '@app/components/hocs'
import { PageLayout } from '@app/components/ui/layouts'
import { useGetIssuedAssetsQuery, useGetTransfersQuery } from '@app/store/apis/qx'
import { useMemo } from 'react'
import { IssuedAssetsTable, TransfersTable } from './components'

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

  const latestIssuedAssets = useMemo(
    () => issuedAssets?.filter((tx) => tx.moneyFlew).slice(0, 10),
    [issuedAssets]
  )
  const latestTransfers = useMemo(
    () => transfers?.filter((tx) => tx.moneyFlew).slice(0, 25),
    [transfers]
  )

  const errorMessage = useMemo(() => {
    if (!isTransfersError && !isIssuedAssetsError) return undefined
    return t('errors.error_fetching_data')
  }, [isTransfersError, isIssuedAssetsError, t])

  return (
    <PageLayout error={errorMessage}>
      <section className="grid gap-24">
        <h2 className="text-center text-2xl font-bold">
          {t('transactions_page.latest_issued_assets')}
        </h2>
        <IssuedAssetsTable issuedAssets={latestIssuedAssets} isLoading={isIssuedAssetsLoading} />
      </section>
      <section className="grid gap-24">
        <h2 className="text-center text-2xl font-bold">
          {t('transactions_page.latest_asset_transfers')}
        </h2>
        <TransfersTable transfers={latestTransfers} isLoading={isTransfersLoading} />
      </section>
    </PageLayout>
  )
}

const TransactionsPageWithHelmet = withHelmet(TransactionsPage, {
  title: 'Transactions | Qx',
  meta: [{ name: 'description', content: 'Check latest transactions on Qx' }]
})

export default TransactionsPageWithHelmet
