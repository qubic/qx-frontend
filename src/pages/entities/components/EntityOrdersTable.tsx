import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { ErrorRow, NoItemsFoundRow } from '@app/components/tables'
import { TableHeadCell } from '@app/components/ui/tables'
import type { EntityOrder } from '@app/store/apis/qx'
import { clsxTwMerge } from '@app/utils'

import {
  ENTITY_ORDERS_TABLE_COLUMNS,
  ENTITY_ORDERS_TABLE_COLUMNS_COUNT,
  ENTITY_ORDERS_TABLE_SKELETON_ROWS
} from '../constants'

import EntityOrderRow from './EntityOrderRow'

const EntityOrdersSkeleton = memo(() =>
  Array.from({ length: ENTITY_ORDERS_TABLE_SKELETON_ROWS }).map((_, index) => (
    <EntityOrderRow.Skeleton key={String(`entity-order-row-skeleton-${index}`)} />
  ))
)

type Props = Readonly<{
  entityOrders: EntityOrder[] | undefined
  isLoading: boolean
  hasError: boolean
  className?: string
}>

export default function EntityOrdersTable({ entityOrders, isLoading, hasError, className }: Props) {
  const { t } = useTranslation()

  const renderTableHeadContent = useCallback(
    () => (
      <tr>
        {ENTITY_ORDERS_TABLE_COLUMNS.map(({ i18nKey, label, align }) => (
          <TableHeadCell
            key={i18nKey}
            className="first:rounded-tl-lg last:rounded-tr-lg"
            label={label}
            align={align}
          >
            {t(i18nKey)}
          </TableHeadCell>
        ))}
      </tr>
    ),
    [t]
  )

  const renderTableContent = useCallback(() => {
    if (isLoading) return <EntityOrdersSkeleton />

    if (!entityOrders || hasError)
      return (
        <ErrorRow
          colSpan={ENTITY_ORDERS_TABLE_COLUMNS_COUNT}
          message={t('orders_table.error_fetching_open_orders')}
        />
      )

    if (!entityOrders.length)
      return (
        <NoItemsFoundRow
          colSpan={ENTITY_ORDERS_TABLE_COLUMNS_COUNT}
          message={t('orders_table.open_orders_not_found')}
        />
      )

    return entityOrders?.map((entityOrder) => (
      <EntityOrderRow key={JSON.stringify(entityOrder)} entityOrder={entityOrder} />
    ))
  }, [isLoading, entityOrders, hasError, t])

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
