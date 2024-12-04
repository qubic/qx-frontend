import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { TableHeadCell } from '@app/components/ui/tables'
import type { Trade } from '@app/store/apis/qx'
import ErrorRow from '../ErrorRow'
import NoItemsFoundRow from '../NoItemsFoundRow'
import {
  TRADES_TABLE_COLUMNS,
  TRADES_TABLE_COLUMNS_COUNT,
  TRADES_TABLE_SKELETON_ROWS
} from './constants'
import TradeRow from './TradeRow'

const TradesSkeleton = memo(() =>
  Array.from({ length: TRADES_TABLE_SKELETON_ROWS }).map((_, index) => (
    <TradeRow.Skeleton key={String(`trade-row-skeleton-${index}`)} />
  ))
)

type Props = Readonly<{
  trades: Trade[] | undefined
  isLoading: boolean
  hasError?: boolean
}>

export default function TradesTable({ trades, isLoading, hasError }: Props) {
  const { t } = useTranslation()

  const renderTableHeadContent = useCallback(
    () => (
      <tr>
        {TRADES_TABLE_COLUMNS.map(({ i18nKey, label, align }) => (
          <TableHeadCell key={i18nKey} label={label} align={align}>
            {t(i18nKey)}
          </TableHeadCell>
        ))}
      </tr>
    ),
    [t]
  )

  const renderTableContent = useCallback(() => {
    if (isLoading) return <TradesSkeleton />

    if (!trades || hasError)
      return (
        <ErrorRow
          colSpan={TRADES_TABLE_COLUMNS_COUNT}
          message={t('trades_table.error_fetching_trades')}
        />
      )

    if (!trades.length)
      return (
        <NoItemsFoundRow
          colSpan={TRADES_TABLE_COLUMNS_COUNT}
          message={t('trades_table.trades_not_found')}
        />
      )

    return trades?.map((trade) => <TradeRow key={trade.transactionHash} trade={trade} />)
  }, [isLoading, trades, hasError, t])

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
