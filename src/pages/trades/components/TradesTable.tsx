import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { Alert } from '@app/components/ui'
import type { Trade } from '@app/store/apis/qx'
import { clsxTwMerge } from '@app/utils'
import { SKELETON_ROWS, TRADES_TABLE_COLUMNS } from '../constants'
import TradeRow from './TradeRow'

const TradesSkeleton = memo(() => {
  return Array.from({ length: SKELETON_ROWS }).map((_, index) => (
    <TradeRow.Skeleton key={String(`trade-row-skeleton-${index}`)} />
  ))
})

const TradeHeadCell = memo(
  ({ children, className }: Readonly<{ children: React.ReactNode; className?: string }>) => (
    <th className={clsxTwMerge('p-16 text-center text-xxs font-400 xs:text-xs', className)}>
      <span className="text-gray-50">{children}</span>
    </th>
  )
)

type Props = Readonly<{
  trades: Trade[] | undefined
  isLoading: boolean
  isMobile: boolean
}>

export default function TradesTable({ trades, isLoading, isMobile }: Props) {
  const { t } = useTranslation()

  const renderTableHeadContent = useCallback(
    () => (
      <tr>
        {TRADES_TABLE_COLUMNS.map(({ i18nkey }) => (
          <TradeHeadCell key={i18nkey}>{t(i18nkey)}</TradeHeadCell>
        ))}
      </tr>
    ),
    [t]
  )

  const renderTableContent = useCallback(() => {
    if (isLoading) return <TradesSkeleton />

    if (!trades)
      return (
        <tr>
          <td className="p-16" colSpan={9}>
            <Alert variant="error">{t('trades_page.error_fetching_trades')}</Alert>
          </td>
        </tr>
      )

    if (!trades.length)
      return (
        <tr>
          <td className="p-16" colSpan={9}>
            <Alert>{t('trades_page.trades_not_found')}</Alert>
          </td>
        </tr>
      )

    return trades?.map((trade) => (
      <TradeRow key={trade.transactionHash} trade={trade} isMobile={isMobile} />
    ))
  }, [isLoading, trades, isMobile, t])

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
