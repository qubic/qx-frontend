import { clsxTwMerge } from '@app/utils'

type Props = Readonly<{
  children: React.ReactNode
  className?: string
}>

export default function TableWrapper({ children, className }: Props) {
  return (
    <div
      className={clsxTwMerge(
        'w-[85vw] max-w-2xl rounded-12 border-1 border-primary-60 bg-primary-70 pb-16 pt-4',
        className
      )}
    >
      <div className="h-200 overflow-x-scroll">
        <table className="be h-fit w-full">{children}</table>
      </div>
    </div>
  )
}
