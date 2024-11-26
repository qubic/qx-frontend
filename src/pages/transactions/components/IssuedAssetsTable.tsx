import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { ErrorRow, NoItemsFoundRow } from '@app/components/tables'
import type { IssuedAsset } from '@app/store/apis/qx'
import { clsxTwMerge } from '@app/utils'
import {
  ISSUED_ASSETS_TABLE_COLUMNS,
  ISSUED_ASSETS_TABLE_COLUMNS_COUNT,
  ISSUED_ASSETS_TABLE_SKELETON_ROWS
} from '../constants'
import IssuedAssetRow from './IssuedAssetRow'

const IssuedAssetsSkeleton = memo(() =>
  Array.from({ length: ISSUED_ASSETS_TABLE_SKELETON_ROWS }).map((_, index) => (
    <IssuedAssetRow.Skeleton key={String(`issued-asset-row-skeleton-${index}`)} />
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
  hasError?: boolean
}>

export default function IssuedAssetsTable({ issuedAssets, isLoading, hasError }: Props) {
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

    if (!issuedAssets || hasError)
      return (
        <ErrorRow
          colSpan={ISSUED_ASSETS_TABLE_COLUMNS_COUNT}
          message={t('issued_assets_table.error_fetching_issued_assets')}
        />
      )

    if (!issuedAssets.length)
      return (
        <NoItemsFoundRow
          colSpan={ISSUED_ASSETS_TABLE_COLUMNS_COUNT}
          message={t('issued_assets_table.issued_assets_not_found')}
        />
      )

    return issuedAssets?.map((issuedAsset) => (
      <IssuedAssetRow key={issuedAsset.hash} issuedAsset={issuedAsset} />
    ))
  }, [isLoading, issuedAssets, hasError, t])

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
