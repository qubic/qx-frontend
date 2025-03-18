export type Language = {
  id: string
  label: string
}

export type TableColumn = {
  i18nKey: string
  label?: string
  align?: React.ThHTMLAttributes<HTMLTableCellElement>['align']
  show?: boolean
}
export type TableColumns = TableColumn[]

export type TableRow = {
  key: string
  content: React.ReactNode
  className?: string
  align?: React.TdHTMLAttributes<HTMLTableCellElement>['align']
}
export type TableRows = TableRow[]
