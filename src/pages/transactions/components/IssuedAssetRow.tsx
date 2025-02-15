import { useMemo } from 'react'
import { Link } from 'react-router-dom'

import { Skeleton } from '@app/components/ui'
import { EntityLink, ExplorerLink } from '@app/components/ui/links'
import { TableRowCell } from '@app/components/ui/tables'
import { PublicRoutes } from '@app/router'
import type { IssuedAsset } from '@app/store/apis/qx'
import type { TableRows } from '@app/types'
import { ExplorerLinkType } from '@app/types/enums'
import { formatDate, formatString } from '@app/utils'

const genIssuedAssetRowCells = (issuedAsset: IssuedAsset): TableRows => [
  {
    key: 'asset',
    content: (
      <Link
        to={PublicRoutes.ASSETS.DETAILS(issuedAsset.source, issuedAsset.extraData.name)}
        className="text-primary-30"
      >
        {issuedAsset.extraData.name}
      </Link>
    )
  },
  {
    key: 'issuer',
    content: <EntityLink value={issuedAsset.source} showTooltip ellipsis noWrap />
  },
  {
    key: 'amount',
    content: formatString(issuedAsset.extraData.numberOfShares),
    align: 'right',
    className: 'w-160 truncate'
  },
  {
    key: 'tick',
    content: (
      <ExplorerLink
        type={ExplorerLinkType.TICK}
        label={formatString(issuedAsset.tick)}
        value={String(issuedAsset.tick)}
        noWrap
      />
    )
  },
  {
    key: 'hash',
    content: (
      <ExplorerLink
        type={ExplorerLinkType.TX}
        value={issuedAsset.hash}
        ellipsis
        showTooltip
        noWrap
      />
    )
  },

  {
    key: 'date_and_time',
    content: formatDate(issuedAsset.tickTime, {
      excludeTimeZone: true,
      shortDate: true
    }),
    className: 'text-slate-500'
  }
]

type Props = Readonly<{
  issuedAsset: IssuedAsset
}>

function IssuedAssetRow({ issuedAsset }: Props) {
  const issuedAssetRowCells = useMemo(() => genIssuedAssetRowCells(issuedAsset), [issuedAsset])

  return (
    <tr className="even:bg-primary-60/30">
      {issuedAssetRowCells.map(({ key, content, className, align }) => (
        <TableRowCell key={`issued-asset-row-cell-${key}`} className={className} align={align}>
          {content}
        </TableRowCell>
      ))}
    </tr>
  )
}

IssuedAssetRow.Skeleton = function IssuedAssetRowSkeleton() {
  return (
    <tr className="animate-pulse border-b border-primary-60">
      <TableRowCell>
        <Skeleton className="h-13 w-32 xs:h-16" />
      </TableRowCell>
      {Array.from({ length: 6 }).map((_, index) => (
        <TableRowCell key={String(`issued-asset-row-cell-skeleton-${index}`)}>
          <Skeleton className="h-13 min-w-88 xs:h-16" />
        </TableRowCell>
      ))}
    </tr>
  )
}

export default IssuedAssetRow
