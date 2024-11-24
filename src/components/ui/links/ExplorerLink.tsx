import { useMemo } from 'react'

import { Tooltip } from '@app/components/ui'
import { CopyTextButton } from '@app/components/ui/buttons'
import { EXPLORER_URL } from '@app/constants/urls'
import { ExplorerLinkType } from '@app/types/enums'
import { clsxTwMerge, formatEllipsis } from '@app/utils'

type Props = {
  value: string
  type: ExplorerLinkType
  label?: string
  copy?: boolean
  ellipsis?: boolean
  className?: string
  showTooltip?: boolean
}

const makeExplorerTxUrl = (tx: string) => `${EXPLORER_URL}/network/tx/${tx}`

const makeExplorerTickUrl = (tick: string) => `${EXPLORER_URL}/network/tick/${tick}`

const getExplorerLinkUrl = (value: string, type: ExplorerLinkType) => {
  switch (type) {
    case ExplorerLinkType.TX:
      return makeExplorerTxUrl(value)
    case ExplorerLinkType.TICK:
      return makeExplorerTickUrl(value)
    default:
      throw new Error('Invalid link type')
  }
}

export default function ExplorerLink({
  value,
  type,
  label,
  className,
  copy = false,
  ellipsis = false,
  showTooltip = false
}: Props) {
  const txLink = useMemo(() => {
    const getDisplayValue = () => {
      if (label) {
        return label
      }
      if (ellipsis) {
        return formatEllipsis(value)
      }
      return value
    }

    return (
      <div className="flex w-fit items-center gap-10">
        <a
          className={clsxTwMerge(
            'break-all font-space text-xxs text-primary-30 xs:text-xs',
            className
          )}
          href={getExplorerLinkUrl(value, type)}
          target="_blank"
          rel="noreferrer"
        >
          {getDisplayValue()}
        </a>
        {copy && <CopyTextButton text={value} />}
      </div>
    )
  }, [className, value, type, copy, label, ellipsis])

  return showTooltip ? (
    <Tooltip tooltipId={value} content={value}>
      {txLink}
    </Tooltip>
  ) : (
    txLink
  )
}
