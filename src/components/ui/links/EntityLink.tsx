import { useMemo } from 'react'
import { Link } from 'react-router-dom'

import { Tooltip } from '@app/components/ui'
import { CopyTextButton } from '@app/components/ui/buttons'
import { PublicRoutes } from '@app/router'
import { clsxTwMerge, formatEllipsis } from '@app/utils'

type Props = {
  value: string
  label?: string
  copy?: boolean
  ellipsis?: boolean
  className?: string
  showTooltip?: boolean
}

export default function EntityLink({
  value,
  label,
  className,
  copy = false,
  ellipsis = false,
  showTooltip = false
}: Props) {
  const addressLink = useMemo(() => {
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
      <div className="flex items-center gap-10">
        <Link
          className={clsxTwMerge(
            'break-all font-space text-xxs text-primary-30 xs:text-xs',
            className
          )}
          to={PublicRoutes.ENTITIES.DETAILS(value)}
        >
          {getDisplayValue()}
        </Link>
        {copy && <CopyTextButton text={value} />}
      </div>
    )
  }, [className, value, copy, label, ellipsis])

  return showTooltip ? (
    <Tooltip tooltipId={value} content={value}>
      {addressLink}
    </Tooltip>
  ) : (
    addressLink
  )
}
