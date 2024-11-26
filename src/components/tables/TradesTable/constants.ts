export const TRADES_TABLE_COLUMNS = [
  { i18nkey: 'global.asset' },
  { i18nkey: 'global.side' },
  { i18nkey: 'global.price' },
  { i18nkey: 'global.shares' },
  { i18nkey: 'global.total' },
  { i18nkey: 'global.hash' },
  { i18nkey: 'global.taker' },
  { i18nkey: 'global.maker' },
  { i18nkey: 'global.date_and_time' }
] as const

export const TRADES_TABLE_COLUMNS_COUNT = TRADES_TABLE_COLUMNS.length

export const TRADES_TABLE_SKELETON_ROWS = 5
