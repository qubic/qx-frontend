import { Alert } from '@app/components/ui'
import { clsxTwMerge } from '@app/utils'

type Props = {
  title?: string
  error?: string
  children: React.ReactNode
  className?: string
}

export default function PageLayout({ title, error, children, className }: Props) {
  return (
    <div className={clsxTwMerge('grid place-items-center gap-24 py-32', className)}>
      {title && <h1 className="my-4 text-center text-3xl font-bold">{title}</h1>}
      {error && <Alert variant="error">{error}</Alert>}
      {children}
    </div>
  )
}
