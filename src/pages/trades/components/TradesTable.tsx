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

function TradeHeadCell({
  children,
  className
}: Readonly<{ children: React.ReactNode; className?: string }>) {
  return (
    <th className={clsxTwMerge('p-16 text-center text-xxs font-400 xs:text-xs', className)}>
      <span className="text-gray-50">{children}</span>
    </th>
  )
}

type Props = Readonly<{
  trades: Trade[] | undefined
  isLoading: boolean
  isMobile: boolean
}>

export default function TradesTable({ trades, isLoading, isMobile }: Props) {
  const { t } = useTranslation()

  const renderTableContent = useCallback(() => {
    if (isLoading) return <TradesSkeleton />

    if (!trades) return <Alert variant="error">{t('trades_page.error_fetching_trades')}</Alert>

    if (!trades.length) return <Alert>{t('trades_page.trades_not_found')}</Alert>

    return trades?.map((trade) => (
      <TradeRow key={trade.transactionHash} trade={trade} isMobile={isMobile} />
    ))
  }, [isLoading, trades, isMobile, t])

  return (
    <div className="w-fit rounded-12 border-1 border-primary-60 bg-primary-70 pb-16">
      <div className="max-w-[85vw] overflow-x-scroll">
        <table className="w-full">
          <thead className="border-b-1 border-primary-60 text-left font-space text-sm text-gray-50">
            <tr>
              {TRADES_TABLE_COLUMNS.map(({ i18nkey }) => (
                <TradeHeadCell key={i18nkey}>{t(i18nkey)}</TradeHeadCell>
              ))}
            </tr>
          </thead>
          <tbody>{renderTableContent()}</tbody>
        </table>
      </div>
    </div>
  )
}
