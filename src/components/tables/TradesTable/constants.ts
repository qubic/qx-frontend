import type { TableColumns } from '@app/types'

export const TRADES_TABLE_COLUMNS: TableColumns = [
  { i18nKey: 'global.asset' },
  { i18nKey: 'global.side' },
  { i18nKey: 'global.price', label: '(QUBIC)', align: 'right' },
  { i18nKey: 'global.amount', align: 'right' },
  { i18nKey: 'global.total', label: '(QUBIC)', align: 'right' },
  { i18nKey: 'global.hash' },
  { i18nKey: 'global.taker' },
  { i18nKey: 'global.maker' },
  { i18nKey: 'global.date_and_time' }
] as const

export const TRADES_TABLE_COLUMNS_COUNT = TRADES_TABLE_COLUMNS.length

export const TRADES_TABLE_SKELETON_ROWS = 5
