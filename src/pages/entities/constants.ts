import type { TableColumns } from '@app/types'

export const ENTITY_ORDERS_TABLE_COLUMNS: TableColumns = [
  { i18nKey: 'global.asset' },
  { i18nKey: 'global.issuer' },
  { i18nKey: 'global.side' },
  { i18nKey: 'global.price', label: '(QUBIC)', align: 'right' },
  { i18nKey: 'global.amount', align: 'right' },
  { i18nKey: 'global.total', label: '(QUBIC)', align: 'right' },
  { i18nKey: 'global.actions', show: false }
] as const

export const ENTITY_ORDERS_TABLE_COLUMNS_COUNT = ENTITY_ORDERS_TABLE_COLUMNS.length

export const ENTITY_ORDERS_TABLE_SKELETON_ROWS = 5

export const PRIVATE_ENTITY_ORDERS_TABLE_COLUMNS_KEYS = ['global.side', 'global.actions']

export const PRIVATE_ENTITY_ORDERS_TABLE_ROWS_KEYS = ['side', 'remove']
