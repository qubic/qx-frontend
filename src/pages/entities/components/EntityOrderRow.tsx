import { useMemo } from 'react'
import { Link } from 'react-router-dom'

import { Skeleton } from '@app/components/ui'
import { EntityLink } from '@app/components/ui/links'
import { PublicRoutes } from '@app/router'
import type { EntityOrder } from '@app/store/apis/qx'
import { clsxTwMerge, formatString } from '@app/utils'

const genEntityOrderRowCells = (entityOrder: EntityOrder) => [
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
    key: 'shares',
    content: formatString(entityOrder.numberOfShares)
  },
  {
    key: 'price',
    content: formatString(entityOrder.price)
  }
]

function EntityOrderRowCell({
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
  entityOrder: EntityOrder
}>

function EntityOrderRow({ entityOrder }: Props) {
  const EntityOrderRowCells = useMemo(() => genEntityOrderRowCells(entityOrder), [entityOrder])

  return (
    <tr className="even:bg-primary-60/30">
      {EntityOrderRowCells.map(({ key, content }) => (
        <EntityOrderRowCell key={`entity-order-row-cell-${key}`}>{content}</EntityOrderRowCell>
      ))}
    </tr>
  )
}

EntityOrderRow.Skeleton = function EntityOrderRowSkeleton() {
  return (
    <tr className="animate-pulse border-b border-primary-60">
      <EntityOrderRowCell>
        <Skeleton className="h-13 w-32 xs:h-16" />
      </EntityOrderRowCell>
      {Array.from({ length: 4 }).map((_, index) => (
        <EntityOrderRowCell key={String(`entity-order-row-cell-skeleton-${index}`)}>
          <Skeleton className="h-13 min-w-88 xs:h-16" />
        </EntityOrderRowCell>
      ))}
    </tr>
  )
}

export default EntityOrderRow
