import { memo, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { ErrorRow, NoItemsFoundRow, TableHead, TableWrapper } from '@app/components/tables'
import { TableHeadCell } from '@app/components/ui/tables'

import {
  ENTITY_ORDERS_TABLE_COLUMNS,
  ENTITY_ORDERS_TABLE_SKELETON_ROWS,
  PRIVATE_ENTITY_ORDERS_TABLE_COLUMNS_KEYS
} from '../constants'
import type { EntityOrderWithType } from '../types'

import EntityOrderRow from './EntityOrderRow'

const EntityOrdersSkeleton = memo(() =>
  Array.from({ length: ENTITY_ORDERS_TABLE_SKELETON_ROWS }).map((_, index) => (
    <EntityOrderRow.Skeleton key={String(`entity-order-row-skeleton-${index}`)} />
  ))
)

type Props = Readonly<{
  entityOrders: EntityOrderWithType[] | undefined
  isEntityOwner: boolean
  isLoading: boolean
  hasError: boolean
}>

export default function EntityOrdersTable({
  entityOrders,
  isEntityOwner,
  isLoading,
  hasError
}: Props) {
  const { t } = useTranslation()

  const tableCols = useMemo(() => {
    if (!isEntityOwner) {
      return ENTITY_ORDERS_TABLE_COLUMNS.filter(
        ({ i18nKey }) => !PRIVATE_ENTITY_ORDERS_TABLE_COLUMNS_KEYS.includes(i18nKey)
      )
    }
    return ENTITY_ORDERS_TABLE_COLUMNS
  }, [isEntityOwner])

  const renderTableHeadContent = useCallback(() => {
    return (
      <tr>
        {tableCols.map(({ i18nKey, label, align, show }) => (
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
    )
  }, [t, tableCols])

  const renderTableContent = useCallback(() => {
    if (isLoading) return <EntityOrdersSkeleton />

    if (!entityOrders || hasError)
      return (
        <ErrorRow
          colSpan={tableCols.length}
          message={t('orders_table.error_fetching_open_orders')}
        />
      )

    if (!entityOrders.length)
      return (
        <NoItemsFoundRow
          colSpan={tableCols.length}
          message={t('orders_table.open_orders_not_found')}
        />
      )

    return entityOrders?.map((entityOrder) => (
      <EntityOrderRow
        key={JSON.stringify(entityOrder)}
        entityOrder={entityOrder}
        isEntityOwner={isEntityOwner}
      />
    ))
  }, [isLoading, entityOrders, hasError, tableCols.length, t, isEntityOwner])

  return (
    <TableWrapper className={!isEntityOwner ? 'w-full' : ''}>
      <TableHead className="sticky top-0 z-10 border-b-1 border-primary-60 bg-primary-70 text-left font-space text-sm text-gray-50">
        {renderTableHeadContent()}
      </TableHead>
      <tbody>{renderTableContent()}</tbody>
    </TableWrapper>
  )
}
