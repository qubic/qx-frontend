import { clsxTwMerge } from '@app/utils'

type Props = Readonly<{
  children: React.ReactNode
  className?: string
}>

export default function TableHead({ children, className }: Props) {
  return (
    <thead
      className={clsxTwMerge(
        'sticky top-0 z-10 border-b-1 border-primary-60 bg-primary-70 text-left font-space text-sm text-gray-50',
        className
      )}
    >
      {children}
    </thead>
  )
}
