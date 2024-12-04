import { clsxTwMerge } from '@app/utils'
import { memo } from 'react'

type Props = Readonly<{
  children: React.ReactNode
  label?: string
  className?: string
  align?: React.ThHTMLAttributes<HTMLTableCellElement>['align']
}>

const TableHeadCell = memo(({ children, label, className, align = 'center' }: Props) => (
  <th className={clsxTwMerge('p-16 text-xxs font-400 xs:text-xs', className)} align={align}>
    <span className="text-gray-50">
      {children}
      <span className="ml-4 text-slate-500">{label}</span>
    </span>
  </th>
))

export default TableHeadCell
