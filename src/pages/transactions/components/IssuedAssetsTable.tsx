import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { Alert } from '@app/components/ui'
import type { IssuedAsset } from '@app/store/apis/qx'
import { clsxTwMerge } from '@app/utils'
import { ISSUED_ASSETS_TABLE_COLUMNS, ISSUED_ASSETS_TABLE_SKELETON_ROWS } from '../constants'
import IssuedAssetRow from './IssuedAssetRow'

const IssuedAssetsSkeleton = memo(() =>
  Array.from({ length: ISSUED_ASSETS_TABLE_SKELETON_ROWS }).map((_, index) => (
    <IssuedAssetRow.Skeleton key={String(`IssuedAsset-row-skeleton-${index}`)} />
  ))
)

const IssuedAssetHeadCell = memo(
  ({ children, className }: Readonly<{ children: React.ReactNode; className?: string }>) => (
    <th className={clsxTwMerge('p-16 text-center text-xxs font-400 xs:text-xs', className)}>
      <span className="text-gray-50">{children}</span>
    </th>
  )
)

type Props = Readonly<{
  issuedAssets: IssuedAsset[] | undefined
  isLoading: boolean
}>

export default function IssuedAssetsTable({ issuedAssets, isLoading }: Props) {
  const { t } = useTranslation()

  const renderTableHeadContent = useCallback(
    () => (
      <tr>
        {ISSUED_ASSETS_TABLE_COLUMNS.map(({ i18nkey }) => (
          <IssuedAssetHeadCell key={i18nkey}>{t(i18nkey)}</IssuedAssetHeadCell>
        ))}
      </tr>
    ),
    [t]
  )

  const renderTableContent = useCallback(() => {
    if (isLoading) return <IssuedAssetsSkeleton />

    if (!issuedAssets)
      return (
        <tr>
          <td className="p-16" colSpan={9}>
            <Alert variant="error">{t('issuedAssets_page.error_fetching_issuedAssets')}</Alert>
          </td>
        </tr>
      )

    if (!issuedAssets.length)
      return (
        <tr>
          <td className="p-16" colSpan={9}>
            <Alert>{t('issuedAssets_page.IssuedAssets_not_found')}</Alert>
          </td>
        </tr>
      )

    return issuedAssets?.map((issuedAsset) => (
      <IssuedAssetRow key={issuedAsset.hash} issuedAsset={issuedAsset} />
    ))
  }, [isLoading, issuedAssets, t])

  return (
    <div className="w-[85vw] max-w-2xl rounded-12 border-1 border-primary-60 bg-primary-70 pb-16">
      <div className="overflow-x-scroll">
        <table className="w-full">
          <thead className="border-b-1 border-primary-60 text-left font-space text-sm text-gray-50">
            {renderTableHeadContent()}
          </thead>
          <tbody>{renderTableContent()}</tbody>
        </table>
      </div>
    </div>
  )
}
