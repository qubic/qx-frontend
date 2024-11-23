import { Link } from 'react-router-dom'

import { Skeleton } from '@app/components/ui'
import { EntityLink, ExplorerTxLink } from '@app/components/ui/links'
import { PublicRoutes } from '@app/router'
import type { Trade } from '@app/store/apis/qx'
import { clsxTwMerge, formatDate, formatString } from '@app/utils'
import { useTranslation } from 'react-i18next'

function TradeRowCell({
  children,
  className
}: Readonly<{ children: React.ReactNode; className?: string }>) {
  return (
    <td className={clsxTwMerge('p-6 text-center text-xxs xs:text-xs md:px-12 md:py-10', className)}>
      {children}
    </td>
  )
}

type Props = Readonly<{
  trade: Trade
  isMobile: boolean
}>

function TradeRow({ trade }: Props) {
  const { t } = useTranslation()
  return (
    <tr>
      <TradeRowCell>
        <Link
          to={PublicRoutes.ASSETS.DETAILS(trade.issuer, trade.assetName)}
          className="text-primary-30"
        >
          {trade.assetName}
        </Link>
      </TradeRowCell>
      <TradeRowCell>
        {trade.bid ? (
          <span className="text-success-40">{t('global.buy')}</span>
        ) : (
          <span className="text-red-500">{t('global.sell')}</span>
        )}
      </TradeRowCell>
      <TradeRowCell>{formatString(trade.numberOfShares)}</TradeRowCell>
      <TradeRowCell>{formatString(trade.price)}</TradeRowCell>
      <TradeRowCell className="space-x-4">
        <span>{formatString(trade.price * trade.numberOfShares)}</span>
        <span className="text-slate-500">qu</span>
      </TradeRowCell>
      <TradeRowCell className="lg:flex lg:justify-center">
        <ExplorerTxLink tx={trade.transactionHash} ellipsis showTooltip />
      </TradeRowCell>
      <TradeRowCell>
        <EntityLink value={trade.taker} ellipsis showTooltip />
      </TradeRowCell>
      <TradeRowCell>
        <EntityLink value={trade.maker} ellipsis showTooltip />
      </TradeRowCell>
      <TradeRowCell className="!text-slate-500">
        {formatDate(trade.tickTime, { excludeTimeZone: true, shortDate: true })}
      </TradeRowCell>
    </tr>
  )
}

TradeRow.Skeleton = function TradeRowSkeleton() {
  return (
    <tr className="animate-pulse border-b border-primary-60">
      <TradeRowCell>
        <Skeleton className="h-13 w-32 xs:h-16" />
      </TradeRowCell>
      <TradeRowCell>
        <Skeleton className="h-13 w-32 xs:h-16" />
      </TradeRowCell>
      {Array.from({ length: 7 }).map((_, index) => (
        <TradeRowCell key={String(`trade-row-cell-skeleton-${index}`)}>
          <Skeleton className="h-13 min-w-88 xs:h-16" />
        </TradeRowCell>
      ))}
    </tr>
  )
}

export default TradeRow
