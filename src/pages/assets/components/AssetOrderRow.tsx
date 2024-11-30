import { useMemo } from 'react'

import { Skeleton } from '@app/components/ui'
import { EntityLink } from '@app/components/ui/links'
import type { AssetOrder } from '@app/store/apis/qx'
import { clsxTwMerge, formatString } from '@app/utils'

const genAssetOrderRowCells = (assetOrder: AssetOrder) => [
  {
    key: 'asset',
    content: <EntityLink value={assetOrder.entityId} showTooltip ellipsis />
  },
  {
    key: 'shares',
    content: formatString(assetOrder.numberOfShares)
  },
  {
    key: 'price',
    content: formatString(assetOrder.price)
  },
  {
    key: 'total',
    content: formatString(assetOrder.numberOfShares * assetOrder.price)
  }
]

function AssetOrderRowCell({
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
  assetOrder: AssetOrder
}>

function AssetOrderRow({ assetOrder }: Props) {
  const assetOrderRowCells = useMemo(() => genAssetOrderRowCells(assetOrder), [assetOrder])

  return (
    <tr className="even:bg-primary-60/30">
      {assetOrderRowCells.map(({ key, content }) => (
        <AssetOrderRowCell key={`asset-order-row-cell-${key}`}>{content}</AssetOrderRowCell>
      ))}
    </tr>
  )
}

AssetOrderRow.Skeleton = function AssetOrderRowSkeleton() {
  return (
    <tr className="animate-pulse border-b border-primary-60">
      {Array.from({ length: 4 }).map((_, index) => (
        <AssetOrderRowCell key={String(`asset-order-row-cell-skeleton-${index}`)}>
          <Skeleton className="h-13 min-w-88 xs:h-16" />
        </AssetOrderRowCell>
      ))}
    </tr>
  )
}

export default AssetOrderRow
