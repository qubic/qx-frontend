import { useMemo } from 'react'

import { Skeleton } from '@app/components/ui'
import { EntityLink } from '@app/components/ui/links'
import { TableRowCell } from '@app/components/ui/tables'
import type { AssetOrder } from '@app/store/apis/qx'
import type { TableRows } from '@app/types'
import { formatString } from '@app/utils'

const genAssetOrderRowCells = (assetOrder: AssetOrder): TableRows => [
  {
    key: 'entity',
    content: <EntityLink value={assetOrder.entityId} showTooltip ellipsis />
  },
  {
    key: 'amount',
    content: formatString(assetOrder.numberOfShares),
    align: 'right'
  },
  {
    key: 'price',
    content: formatString(assetOrder.price),
    align: 'right'
  },
  {
    key: 'total',
    content: formatString(assetOrder.numberOfShares * assetOrder.price),
    align: 'right'
  }
]

type Props = Readonly<{
  assetOrder: AssetOrder
}>

function AssetOrderRow({ assetOrder }: Props) {
  const assetOrderRowCells = useMemo(() => genAssetOrderRowCells(assetOrder), [assetOrder])

  return (
    <tr className="even:bg-primary-60/30">
      {assetOrderRowCells.map(({ key, content, align }) => (
        <TableRowCell key={`asset-order-row-cell-${key}`} align={align}>
          {content}
        </TableRowCell>
      ))}
    </tr>
  )
}

AssetOrderRow.Skeleton = function AssetOrderRowSkeleton() {
  return (
    <tr className="animate-pulse border-b border-primary-60">
      {Array.from({ length: 4 }).map((_, index) => (
        <TableRowCell key={String(`asset-order-row-cell-skeleton-${index}`)}>
          <Skeleton className="h-13 min-w-88 xs:h-16" />
        </TableRowCell>
      ))}
    </tr>
  )
}

export default AssetOrderRow
