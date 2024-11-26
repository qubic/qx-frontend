import { clsxTwMerge } from '@app/utils'

type Props = {
  colSpan: number
  message: string
  className?: string
}

export default function NoItemsFoundRow({ colSpan, message, className }: Props) {
  return (
    <tr>
      <td
        align="center"
        className={clsxTwMerge('p-16 text-center text-sm text-slate-500', className)}
        colSpan={colSpan}
      >
        {message}
      </td>
    </tr>
  )
}
