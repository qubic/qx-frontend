import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { ErrorRow, NoItemsFoundRow } from '@app/components/tables'
import type { AssetOrder } from '@app/store/apis/qx'
import { clsxTwMerge } from '@app/utils'
import {
  ASSET_ORDERS_TABLE_COLUMNS,
  ASSET_ORDERS_TABLE_COLUMNS_COUNT,
  ASSET_ORDERS_TABLE_SKELETON_ROWS
} from '../constants'
import AssetOrderRow from './AssetOrderRow'

const AssetOrdersSkeleton = memo(() => {
  return Array.from({ length: ASSET_ORDERS_TABLE_SKELETON_ROWS }).map((_, index) => (
    <AssetOrderRow.Skeleton key={String(`asset-order-row-skeleton-${index}`)} />
  ))
})

const AssetOrderHeadCell = memo(
  ({ children, className }: Readonly<{ children: React.ReactNode; className?: string }>) => (
    <th
      className={clsxTwMerge(
        'p-16 text-center text-xxs font-400 first:rounded-tl-lg last:rounded-tr-lg xs:text-xs',
        className
      )}
    >
      <span className="text-gray-50">{children}</span>
    </th>
  )
)

type Props = Readonly<{
  assetOrders: AssetOrder[] | undefined
  isLoading: boolean
  hasError: boolean
  className?: string
}>

export default function AssetOrdersTable({ assetOrders, isLoading, hasError, className }: Props) {
  const { t } = useTranslation()

  const renderTableHeadContent = useCallback(
    () => (
      <tr>
        {ASSET_ORDERS_TABLE_COLUMNS.map(({ i18nkey }) => (
          <AssetOrderHeadCell key={i18nkey}>{t(i18nkey)}</AssetOrderHeadCell>
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
      <AssetOrderRow key={JSON.stringify(assetOrder)} assetOrder={assetOrder} />
    ))
  }, [isLoading, assetOrders, hasError, t])

  return (
    <div
      className={clsxTwMerge(
        'w-full max-w-2xl rounded-12 border-1 border-primary-60 bg-primary-70 pb-16 pt-4',
        className
      )}
    >
      <div className="overflow-x-scroll md:h-200">
        <table className="h-fit w-full">
          <thead className="sticky top-0 z-10 border-b-1 border-primary-60 bg-primary-70 text-left font-space text-sm text-gray-50">
            {renderTableHeadContent()}
          </thead>
          <tbody>{renderTableContent()}</tbody>
        </table>
      </div>
    </div>
  )
}
