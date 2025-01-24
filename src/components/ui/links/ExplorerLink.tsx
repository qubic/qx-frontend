import { useMemo } from 'react'

import { Tooltip } from '@app/components/ui'
import { CopyTextButton } from '@app/components/ui/buttons'
import { ExplorerLinkType } from '@app/types/enums'
import { clsxTwMerge, formatEllipsis } from '@app/utils'
import { makeExplorerAddressUrl, makeExplorerTickUrl, makeExplorerTxUrl } from '@app/utils/explorer'

type Props = {
  value: string
  type: ExplorerLinkType
  label?: string | React.ReactNode
  copy?: boolean
  ellipsis?: boolean
  className?: string
  showTooltip?: boolean
  tooltipContent?: string
}

const getExplorerLinkUrl = (value: string, type: ExplorerLinkType) => {
  switch (type) {
    case ExplorerLinkType.TX:
      return makeExplorerTxUrl(value)
    case ExplorerLinkType.TICK:
      return makeExplorerTickUrl(value)
    case ExplorerLinkType.ADDRESS:
      return makeExplorerAddressUrl(value)
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
  showTooltip = false,
  tooltipContent = value
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
    <Tooltip tooltipId={value} content={tooltipContent}>
      {txLink}
    </Tooltip>
  ) : (
    txLink
  )
}
