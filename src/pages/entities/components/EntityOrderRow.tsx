import { useMemo } from 'react'
import { Link } from 'react-router-dom'

import { Skeleton } from '@app/components/ui'
import { EntityLink } from '@app/components/ui/links'
import { TableRowCell } from '@app/components/ui/tables'
import { PublicRoutes } from '@app/router'
import type { EntityOrder } from '@app/store/apis/qx'
import type { TableRows } from '@app/types'
import { formatString } from '@app/utils'

const genEntityOrderRowCells = (entityOrder: EntityOrder): TableRows => [
  {
    key: 'asset',
    content: (
      <Link
        to={PublicRoutes.ASSETS.DETAILS(entityOrder.issuerId, entityOrder.assetName)}
        className="text-primary-30"
      >
        {entityOrder.assetName}
      </Link>
    )
  },
  {
    key: 'issuer',
    content: <EntityLink value={entityOrder.issuerId} showTooltip ellipsis />
  },
  {
    key: 'amount',
    content: formatString(entityOrder.numberOfShares),
    align: 'right'
  },
  {
    key: 'price',
    content: formatString(entityOrder.price),
    align: 'right'
  }
]

type Props = Readonly<{
  entityOrder: EntityOrder
}>

function EntityOrderRow({ entityOrder }: Props) {
  const EntityOrderRowCells = useMemo(() => genEntityOrderRowCells(entityOrder), [entityOrder])

  return (
    <tr className="even:bg-primary-60/30">
      {EntityOrderRowCells.map(({ key, content, align }) => (
        <TableRowCell key={`entity-order-row-cell-${key}`} align={align}>
          {content}
        </TableRowCell>
      ))}
    </tr>
  )
}

EntityOrderRow.Skeleton = function EntityOrderRowSkeleton() {
  return (
    <tr className="animate-pulse border-b border-primary-60">
      <TableRowCell>
        <Skeleton className="h-13 w-32 xs:h-16" />
      </TableRowCell>
      {Array.from({ length: 4 }).map((_, index) => (
        <TableRowCell key={String(`entity-order-row-cell-skeleton-${index}`)}>
          <Skeleton className="h-13 min-w-88 xs:h-16" />
        </TableRowCell>
      ))}
    </tr>
  )
}

export default EntityOrderRow
