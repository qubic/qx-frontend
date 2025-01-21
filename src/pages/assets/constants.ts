import type { TableColumns } from '@app/types'

export const ASSET_ORDERS_TABLE_COLUMNS: TableColumns = [
  { i18nKey: 'global.price', label: '(QUBIC)', align: 'right' },
  { i18nKey: 'global.amount', align: 'right' },
  { i18nKey: 'global.total', label: '(QUBIC)', align: 'right' },
  { i18nKey: 'global.actions', show: false }
] as const

export const ASSET_ORDERS_TABLE_COLUMNS_COUNT = ASSET_ORDERS_TABLE_COLUMNS.length

export const ASSET_ORDERS_TABLE_SKELETON_ROWS = 5
