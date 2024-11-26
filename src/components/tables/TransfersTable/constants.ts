export const TRANSFERS_TABLE_COLUMNS = [
  { i18nkey: 'global.asset' },
  { i18nkey: 'global.shares' },
  { i18nkey: 'global.tick' },
  { i18nkey: 'global.hash' },
  { i18nkey: 'global.from' },
  { i18nkey: 'global.to' },
  { i18nkey: 'global.date_and_time' }
] as const

export const TRANSFERS_TABLE_COLUMNS_COUNT = TRANSFERS_TABLE_COLUMNS.length

export const TRANSFERS_TABLE_SKELETON_ROWS = 5
