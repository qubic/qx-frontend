import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { TableHeadCell } from '@app/components/ui/tables'
import type { Transfer } from '@app/store/apis/qx'

import ErrorRow from '../ErrorRow'
import NoItemsFoundRow from '../NoItemsFoundRow'
import TableHead from '../TableHead'
import TableWrapper from '../TableWrapper'

import {
  TRANSFERS_TABLE_COLUMNS,
  TRANSFERS_TABLE_COLUMNS_COUNT,
  TRANSFERS_TABLE_SKELETON_ROWS
} from './constants'
import TransferRow from './TransferRow'

const TransfersSkeleton = memo(() =>
  Array.from({ length: TRANSFERS_TABLE_SKELETON_ROWS }).map((_, index) => (
    <TransferRow.Skeleton key={String(`transfer-row-skeleton-${index}`)} />
  ))
)

type Props = Readonly<{
  transfers: Transfer[] | undefined
  isLoading: boolean
  hasError?: boolean
}>

export default function TransfersTable({ transfers, isLoading, hasError }: Props) {
  const { t } = useTranslation()

  const renderTableHeadContent = useCallback(
    () => (
      <tr>
        {TRANSFERS_TABLE_COLUMNS.map(({ i18nKey, align }) => (
          <TableHeadCell key={i18nKey} align={align}>
            {t(i18nKey)}
          </TableHeadCell>
        ))}
      </tr>
    ),
    [t]
  )

  const renderTableContent = useCallback(() => {
    if (isLoading) return <TransfersSkeleton />

    if (!transfers || hasError)
      return (
        <ErrorRow
          colSpan={TRANSFERS_TABLE_COLUMNS_COUNT}
          message={t('transfers_table.error_fetching_transfers')}
        />
      )

    if (!transfers.length)
      return (
        <NoItemsFoundRow
          colSpan={TRANSFERS_TABLE_COLUMNS_COUNT}
          message={t('transfers_table.transfers_not_found')}
        />
      )

    return transfers?.map((transfer) => <TransferRow key={transfer.hash} transfer={transfer} />)
  }, [isLoading, transfers, hasError, t])

  return (
    <TableWrapper>
      <TableHead>{renderTableHeadContent()}</TableHead>
      <tbody>{renderTableContent()}</tbody>
    </TableWrapper>
  )
}
