import { useMemo } from 'react'
import { Link } from 'react-router-dom'

import { Skeleton } from '@app/components/ui'
import { EntityLink, ExplorerLink } from '@app/components/ui/links'
import { PublicRoutes } from '@app/router'
import type { Transfer } from '@app/store/apis/qx'
import { ExplorerLinkType } from '@app/types/enums'
import { clsxTwMerge, formatDate, formatString } from '@app/utils'

const genTransferRowCells = (transfer: Transfer) => [
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
    key: 'shares',
    content: formatString(transfer.extraData.numberOfShares)
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
    className: '!text-slate-500'
  }
]

function TransferRowCell({
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
  transfer: Transfer
  isMobile: boolean
}>

function TransferRow({ transfer }: Props) {
  const transferRowCells = useMemo(() => genTransferRowCells(transfer), [transfer])

  return (
    <tr className="even:bg-primary-60/30">
      {transferRowCells.map(({ key, content, className }) => (
        <TransferRowCell key={`transfer-row-cell-${key}`} className={className}>
          {content}
        </TransferRowCell>
      ))}
    </tr>
  )
}

TransferRow.Skeleton = function TransferRowSkeleton() {
  return (
    <tr className="animate-pulse border-b border-primary-60">
      <TransferRowCell>
        <Skeleton className="h-13 w-32 xs:h-16" />
      </TransferRowCell>
      <TransferRowCell>
        <Skeleton className="h-13 w-32 xs:h-16" />
      </TransferRowCell>
      {Array.from({ length: 7 }).map((_, index) => (
        <TransferRowCell key={String(`transfer-row-cell-skeleton-${index}`)}>
          <Skeleton className="h-13 min-w-88 xs:h-16" />
        </TransferRowCell>
      ))}
    </tr>
  )
}

export default TransferRow
