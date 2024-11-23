import { useMemo } from 'react'

import { Tooltip } from '@app/components/ui'
import { CopyTextButton } from '@app/components/ui/buttons'
import { EXPLORER_URL } from '@app/constants/urls'
import { clsxTwMerge, formatEllipsis } from '@app/utils'

type Props = {
  tx: string
  label?: string
  copy?: boolean
  ellipsis?: boolean
  className?: string
  showTooltip?: boolean
}

const makeExplorertxUrl = (tx: string) => `${EXPLORER_URL}/network/tx/${tx}`

export default function ExplorerTxLink({
  tx,
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
        return formatEllipsis(tx)
      }
      return tx
    }

    return (
      <div className="flex w-fit items-center gap-10">
        <a
          className={clsxTwMerge(
            'break-all font-space text-xxs text-primary-30 xs:text-xs',
            className
          )}
          href={makeExplorertxUrl(tx)}
          target="_blank"
          rel="noreferrer"
        >
          {getDisplayValue()}
        </a>
        {copy && <CopyTextButton text={tx} />}
      </div>
    )
  }, [className, tx, copy, label, ellipsis])

  return showTooltip ? <Tooltip content={tx}>{txLink}</Tooltip> : txLink
}
