import { useMemo } from 'react'
import { Link } from 'react-router-dom'

import { Skeleton } from '@app/components/ui'
import { EntityLink, ExplorerLink } from '@app/components/ui/links'
import { TableRowCell } from '@app/components/ui/tables'
import { PublicRoutes } from '@app/router'
import type { Transfer } from '@app/store/apis/qx'
import type { TableRows } from '@app/types'
import { ExplorerLinkType } from '@app/types/enums'
import { formatDate, formatString } from '@app/utils'

const genTransferRowCells = (transfer: Transfer): TableRows => [
  {
    key: 'asset',
    content: (
      <Link
        to={PublicRoutes.ASSETS.DETAILS(transfer.extraData.issuer, transfer.extraData.name)}
        className="text-primary-30"
      >
        {transfer.extraData.name}
      </Link>
    )
  },
  {
    key: 'amount',
    content: formatString(transfer.extraData.numberOfShares),
    align: 'right'
  },
  {
    key: 'tick',
    content: (
      <ExplorerLink
        type={ExplorerLinkType.TICK}
        label={formatString(transfer.tick)}
        value={String(transfer.tick)}
      />
    )
  },
  {
    key: 'hash',
    content: <ExplorerLink type={ExplorerLinkType.TX} value={transfer.hash} ellipsis showTooltip />
  },
  {
    key: 'from',
    content: <EntityLink value={transfer.source} ellipsis showTooltip />
  },
  {
    key: 'to',
    content: <EntityLink value={transfer.extraData.newOwner} ellipsis showTooltip />
  },
  {
    key: 'date_and_time',
    content: formatDate(transfer.tickTime, {
      excludeTimeZone: true,
      shortDate: true
    }),
    className: 'text-slate-500'
  }
]

type Props = Readonly<{
  transfer: Transfer
}>

function TransferRow({ transfer }: Props) {
  const transferRowCells = useMemo(() => genTransferRowCells(transfer), [transfer])

  return (
    <tr className="even:bg-primary-60/30">
      {transferRowCells.map(({ key, content, className, align }) => (
        <TableRowCell key={`transfer-row-cell-${key}`} className={className} align={align}>
          {content}
        </TableRowCell>
      ))}
    </tr>
  )
}

TransferRow.Skeleton = function TransferRowSkeleton() {
  return (
    <tr className="animate-pulse border-b border-primary-60">
      <TableRowCell>
        <Skeleton className="h-13 w-32 xs:h-16" />
      </TableRowCell>
      <TableRowCell>
        <Skeleton className="h-13 w-32 xs:h-16" />
      </TableRowCell>
      {Array.from({ length: 7 }).map((_, index) => (
        <TableRowCell key={String(`transfer-row-cell-skeleton-${index}`)}>
          <Skeleton className="h-13 min-w-88 xs:h-16" />
        </TableRowCell>
      ))}
    </tr>
  )
}

export default TransferRow
