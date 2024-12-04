import type { TableColumns } from '@app/types'

export const ISSUED_ASSETS_TABLE_COLUMNS: TableColumns = [
  { i18nKey: 'global.asset' },
  { i18nKey: 'global.issuer' },
  { i18nKey: 'global.amount', align: 'right' },
  { i18nKey: 'global.tick' },
  { i18nKey: 'global.hash' },
  { i18nKey: 'global.date_and_time' }
] as const

export const ISSUED_ASSETS_TABLE_COLUMNS_COUNT = ISSUED_ASSETS_TABLE_COLUMNS.length

export const ISSUED_ASSETS_TABLE_SKELETON_ROWS = 1
