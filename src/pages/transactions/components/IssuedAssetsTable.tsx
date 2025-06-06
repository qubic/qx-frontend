import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { ErrorRow, NoItemsFoundRow, TableHead, TableWrapper } from '@app/components/tables'
import { TableHeadCell } from '@app/components/ui/tables'
import type { IssuedAsset } from '@app/store/apis/qx'

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
        {ISSUED_ASSETS_TABLE_COLUMNS.map(({ i18nKey, align }) => (
          <TableHeadCell key={i18nKey} align={align}>
            {t(i18nKey)}
          </TableHeadCell>
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
    <TableWrapper>
      <TableHead>{renderTableHeadContent()}</TableHead>
      <tbody>{renderTableContent()}</tbody>
    </TableWrapper>
  )
}
