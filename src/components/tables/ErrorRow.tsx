import { Alert } from '../ui'

type Props = {
  colSpan: number
  message: string
}

export default function ErrorRow({ colSpan, message }: Props) {
  return (
    <tr>
      <td align="center" className="p-16" colSpan={colSpan}>
        <Alert variant="error">{message}</Alert>
      </td>
    </tr>
  )
}
