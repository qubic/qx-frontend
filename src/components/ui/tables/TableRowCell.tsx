import { clsxTwMerge } from '@app/utils'
import { memo } from 'react'

type Props = Readonly<
  React.HTMLAttributes<HTMLTableCellElement> & {
    className?: string
    align?: React.TdHTMLAttributes<HTMLTableCellElement>['align']
  }
>

const TableRowCell = memo(({ children, className, align = 'center', ...rest }: Props) => (
  <td
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...rest}
    align={align}
    className={clsxTwMerge('p-6 text-xxs xs:text-xs md:px-12 md:py-10', className)}
  >
    {children}
  </td>
))

export default TableRowCell
