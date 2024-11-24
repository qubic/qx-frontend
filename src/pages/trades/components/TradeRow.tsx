import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { Skeleton } from '@app/components/ui'
import { EntityLink, ExplorerLink } from '@app/components/ui/links'
import { PublicRoutes } from '@app/router'
import type { Trade } from '@app/store/apis/qx'
import { ExplorerLinkType } from '@app/types/enums'
import { clsxTwMerge, formatDate, formatString } from '@app/utils'

const genTradeRowCells = (trade: Trade, t: (key: string) => string) => [
  {
    key: 'asset',
    content: (
      <Link
        to={PublicRoutes.ASSETS.DETAILS(trade.issuer, trade.assetName)}
        className="text-primary-30"
      >
        {trade.assetName}
      </Link>
    )
  },
  {
    key: 'side',
    content: trade.bid ? (
      <span className="text-success-40">{t('global.buy')}</span>
    ) : (
      <span className="text-red-500">{t('global.sell')}</span>
    )
  },
  {
    key: 'price',
    content: formatString(trade.numberOfShares)
  },
  {
    key: 'shares',
    content: formatString(trade.price)
  },
  {
    key: 'total',
    content: (
      <>
        <span>{formatString(trade.price * trade.numberOfShares)}</span>
        <span className="text-slate-500">qu</span>
      </>
    )
  },
  {
    key: 'hash',
    content: (
      <ExplorerLink type={ExplorerLinkType.TX} value={trade.transactionHash} ellipsis showTooltip />
    )
  },
  {
    key: 'taker',
    content: <EntityLink value={trade.taker} ellipsis showTooltip />
  },
  {
    key: 'maker',
    content: <EntityLink value={trade.maker} ellipsis showTooltip />
  },
  {
    key: 'date_and_time',
    content: formatDate(trade.tickTime, {
      excludeTimeZone: true,
      shortDate: true
    }),
    className: '!text-slate-500'
  }
]

function TradeRowCell({
  children,
  className,
  ...rest
}: React.HTMLAttributes<HTMLTableCellElement> & { className?: string }) {
  return (
    <td
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      align="center"
      className={clsxTwMerge('p-6 text-xxs xs:text-xs md:px-12 md:py-10', className)}
    >
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
  const tradeRowCells = useMemo(() => genTradeRowCells(trade, t), [t, trade])

  return (
    <tr className="even:bg-primary-60/30">
      {tradeRowCells.map(({ key, content, className }) => (
        <TradeRowCell key={`trade-row-cell-${key}`} className={className}>
          {content}
        </TradeRowCell>
      ))}
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
