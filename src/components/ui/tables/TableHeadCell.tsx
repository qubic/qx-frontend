import { memo } from 'react'

import { clsxTwMerge } from '@app/utils'

type Props = Readonly<{
  children: React.ReactNode
  label?: string
  className?: string
  align?: React.ThHTMLAttributes<HTMLTableCellElement>['align']
  show?: boolean
}>

const TableHeadCell = memo(
  ({ children, label, className, align = 'center', show = true }: Props) => (
    <th className={clsxTwMerge('p-14 text-xxs font-400 xs:text-xs', className)} align={align}>
      {show && (
        <span className="text-gray-50">
          {children}
          {label && <span className="ml-4 text-slate-500">{label}</span>}
        </span>
      )}
    </th>
  )
)

export default TableHeadCell
