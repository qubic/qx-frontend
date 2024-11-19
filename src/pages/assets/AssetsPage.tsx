import { PageLayout } from '@app/components/ui/layouts'
import type { Asset } from '@app/store/apis/qx'
import { useGetAssetsQuery } from '@app/store/apis/qx'
import { ASSETS_ISSUER_ADDRESS } from '@app/utils/qubic'
import { formatRTKError } from '@app/utils/rtk'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { AssetsSection } from './components'

export default function AssetsPage() {
  const { data: assets = [], error, isFetching } = useGetAssetsQuery()
  const { t } = useTranslation()

  const { smartContractShares, tokens } = useMemo(
    () =>
      assets.reduce(
        (acc: { smartContractShares: Asset[]; tokens: Asset[] }, asset) => {
          const key = asset.issuer === ASSETS_ISSUER_ADDRESS ? 'smartContractShares' : 'tokens'
          acc[key].push(asset)
          return acc
        },
        { smartContractShares: [], tokens: [] }
      ),
    [assets]
  )

  return (
    <PageLayout title={t('assets_page.qx_assets')} error={error && formatRTKError(error)}>
      <AssetsSection
        title={t('global.smart_contract_shares')}
        assets={smartContractShares}
        isLoading={isFetching}
      />
      <AssetsSection
        title={t('global.tokens')}
        assets={tokens}
        isLoading={isFetching}
        skeletonQty={4}
      />
    </PageLayout>
  )
}
