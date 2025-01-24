import type { TFunction } from 'i18next'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import type { OrderPayload } from '@app/components/modals/TradeModal/trade-modal.types'
import { Skeleton } from '@app/components/ui'
import { Button } from '@app/components/ui/buttons'
import { TableRowCell } from '@app/components/ui/tables'
import { type AssetOrder } from '@app/store/apis/qx'
import type { TableRows } from '@app/types'
import { OrderType } from '@app/types/enums'
import { formatString } from '@app/utils'

const genAssetOrderRowCells = (
  assetOrder: AssetOrder,
  orderType: OrderType,
  onRowActionClick: (orderPayload: OrderPayload) => void,
  t: TFunction
): TableRows => [
  {
    key: 'price',
    content: (
      <span className={orderType === OrderType.BID ? 'text-green-400' : 'text-red-500'}>
        {formatString(assetOrder.price)}
      </span>
    ),
    align: 'right'
  },
  {
    key: 'amount',
    content: formatString(assetOrder.numberOfShares),
    align: 'right'
  },
  {
    key: 'total',
    content: formatString(assetOrder.numberOfShares * assetOrder.price),
    align: 'right'
  },
  {
    key: 'action',
    content: (
      <Button
        color={orderType === OrderType.ASK ? 'green' : 'red'}
        size="xs"
        className="py-2"
        onClick={() => {
          onRowActionClick({
            pricePerShare: assetOrder.price,
            numberOfShares: assetOrder.numberOfShares
          })
        }}
      >
        {orderType === OrderType.ASK ? t('global.buy') : t('global.sell')}
      </Button>
    )
  }
]

type Props = Readonly<{
  assetOrder: AssetOrder
  orderType: OrderType
  onRowActionClick: (orderPayload: OrderPayload) => void
}>

function AssetOrderRow({ assetOrder, orderType, onRowActionClick }: Props) {
  const { t } = useTranslation()

  const assetOrderRowCells = useMemo(
    () => genAssetOrderRowCells(assetOrder, orderType, onRowActionClick, t),
    [assetOrder, onRowActionClick, orderType, t]
  )

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
