export const ISSUED_ASSETS_TABLE_COLUMNS = [
  { i18nkey: 'global.asset' },
  { i18nkey: 'global.issuer' },
  { i18nkey: 'global.shares' },
  { i18nkey: 'global.tick' },
  { i18nkey: 'global.decimals' },
  { i18nkey: 'global.hash' },
  { i18nkey: 'global.date_and_time' }
] as const

export const ISSUED_ASSETS_TABLE_COLUMNS_COUNT = ISSUED_ASSETS_TABLE_COLUMNS.length

export const ISSUED_ASSETS_TABLE_SKELETON_ROWS = 1
