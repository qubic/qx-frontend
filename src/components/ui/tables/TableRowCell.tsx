import { memo } from 'react'

import { clsxTwMerge } from '@app/utils'

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
    className={clsxTwMerge('px-12 py-10 text-xxs xs:text-xs', className)}
  >
    {children}
  </td>
))

export default TableRowCell
