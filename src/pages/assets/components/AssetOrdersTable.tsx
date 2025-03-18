import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import type { OrderPayload } from '@app/components/modals/TradeModal/trade-modal.types'
import { ErrorRow, NoItemsFoundRow, TableHead, TableWrapper } from '@app/components/tables'
import { TableHeadCell } from '@app/components/ui/tables'
import type { AssetOrder } from '@app/store/apis/qx'
import type { OrderType } from '@app/types/enums'

import {
  ASSET_ORDERS_TABLE_COLUMNS,
  ASSET_ORDERS_TABLE_COLUMNS_COUNT,
  ASSET_ORDERS_TABLE_SKELETON_ROWS
} from '../constants'

import AssetOrderRow from './AssetOrderRow'

const AssetOrdersSkeleton = memo(() =>
  Array.from({ length: ASSET_ORDERS_TABLE_SKELETON_ROWS }).map((_, index) => (
    <AssetOrderRow.Skeleton key={String(`asset-order-row-skeleton-${index}`)} />
  ))
)

type Props = Readonly<{
  assetOrders: AssetOrder[] | undefined
  ordersType: OrderType
  onRowActionClick: (orderPayload: OrderPayload) => void
  isLoading: boolean
  hasError: boolean
}>

export default function AssetOrdersTable({
  assetOrders,
  ordersType,
  onRowActionClick,
  isLoading,
  hasError
}: Props) {
  const { t } = useTranslation()

  const renderTableHeadContent = useCallback(
    () => (
      <tr>
        {ASSET_ORDERS_TABLE_COLUMNS.map(({ i18nKey, label, align, show }) => (
          <TableHeadCell
            key={i18nKey}
            className="first:rounded-tl-lg last:rounded-tr-lg"
            label={label}
            align={align}
            show={show}
          >
            {t(i18nKey)}
          </TableHeadCell>
        ))}
      </tr>
    ),
    [t]
  )

  const renderTableContent = useCallback(() => {
    if (isLoading) return <AssetOrdersSkeleton />

    if (!assetOrders || hasError)
      return (
        <ErrorRow
          colSpan={ASSET_ORDERS_TABLE_COLUMNS_COUNT}
          message={t('orders_table.error_fetching_open_orders')}
        />
      )

    if (!assetOrders.length)
      return (
        <NoItemsFoundRow
          colSpan={ASSET_ORDERS_TABLE_COLUMNS_COUNT}
          message={t('orders_table.open_orders_not_found')}
        />
      )

    return assetOrders?.map((assetOrder) => (
      <AssetOrderRow
        key={JSON.stringify(assetOrder)}
        assetOrder={assetOrder}
        orderType={ordersType}
        onRowActionClick={onRowActionClick}
      />
    ))
  }, [isLoading, assetOrders, hasError, t, ordersType, onRowActionClick])

  return (
    <TableWrapper className="w-full">
      <TableHead>{renderTableHeadContent()}</TableHead>
      <tbody>{renderTableContent()}</tbody>
    </TableWrapper>
  )
}
