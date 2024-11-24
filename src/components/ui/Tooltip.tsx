import { useId, useMemo } from 'react'
import { Tooltip as ReactTooltip } from 'react-tooltip'

type Props = {
  tooltipId: string
  children: React.ReactNode
  content: string
}

export default function Tooltip({ tooltipId, children, content }: Props) {
  const id = useId()

  const tooltipIdWithId = useMemo(() => `${tooltipId}-${id}`, [tooltipId, id])

  return (
    <div className="group relative w-fit">
      <div data-tooltip-id={tooltipIdWithId}>{children}</div>
      <ReactTooltip
        id={tooltipIdWithId}
        style={{ backgroundColor: '#202E3C', borderRadius: 10 }}
        opacity={100}
      >
        {content}
      </ReactTooltip>
    </div>
  )
}
