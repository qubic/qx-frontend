import type { TFunction } from 'i18next'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { Skeleton } from '@app/components/ui'
import { EntityLink, ExplorerLink } from '@app/components/ui/links'
import { TableRowCell } from '@app/components/ui/tables'
import { PublicRoutes } from '@app/router'
import type { Trade } from '@app/store/apis/qx'
import type { TableRows } from '@app/types'
import { ExplorerLinkType, TradeSide } from '@app/types/enums'
import { formatDate, formatString } from '@app/utils'

const getTradeSide = (trade: Trade, entityId?: string): TradeSide => {
  if (!entityId) {
    return trade.bid ? TradeSide.SELL : TradeSide.BUY
  }
  if ((trade.bid && trade.taker === entityId) || (!trade.bid && trade.maker === entityId)) {
    return TradeSide.BUY
  }
  return TradeSide.SELL
}

const genTradeRowCells = (trade: Trade, t: TFunction, entityId?: string): TableRows => [
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
    content:
      getTradeSide(trade, entityId) === TradeSide.BUY ? (
        <span className="text-success-40">{t('global.buy')}</span>
      ) : (
        <span className="text-red-500">{t('global.sell')}</span>
      )
  },
  {
    key: 'price',
    content: formatString(trade.price),
    align: 'right'
  },
  {
    key: 'amount',
    content: formatString(trade.numberOfShares),
    align: 'right'
  },
  {
    key: 'total',
    content: formatString(trade.price * trade.numberOfShares),
    align: 'right'
  },
  {
    key: 'hash',
    content: (
      <ExplorerLink
        type={ExplorerLinkType.TX}
        value={trade.transactionHash}
        ellipsis
        showTooltip
        noWrap
      />
    )
  },
  {
    key: 'taker',
    content: <EntityLink value={trade.taker} ellipsis showTooltip noWrap />
  },
  {
    key: 'maker',
    content: <EntityLink value={trade.maker} ellipsis showTooltip noWrap />
  },
  {
    key: 'date_and_time',
    content: formatDate(trade.tickTime, {
      excludeTimeZone: true,
      shortDate: true
    }),
    className: 'text-slate-500'
  }
]

type Props = Readonly<{
  trade: Trade
  entityId?: string
}>

function TradeRow({ trade, entityId }: Props) {
  const { t } = useTranslation()
  const tradeRowCells = useMemo(() => genTradeRowCells(trade, t, entityId), [trade, entityId, t])

  return (
    <tr className="even:bg-primary-60/30">
      {tradeRowCells.map(({ key, content, className, align }) => (
        <TableRowCell key={`trade-row-cell-${key}`} className={className} align={align}>
          {content}
        </TableRowCell>
      ))}
    </tr>
  )
}

TradeRow.Skeleton = function TradeRowSkeleton() {
  return (
    <tr className="animate-pulse border-b border-primary-60">
      <TableRowCell>
        <Skeleton className="h-13 w-32 xs:h-16" />
      </TableRowCell>
      <TableRowCell>
        <Skeleton className="h-13 w-32 xs:h-16" />
      </TableRowCell>
      {Array.from({ length: 7 }).map((_, index) => (
        <TableRowCell key={String(`trade-row-cell-skeleton-${index}`)}>
          <Skeleton className="h-13 min-w-88 xs:h-16" />
        </TableRowCell>
      ))}
    </tr>
  )
}

export default TradeRow
