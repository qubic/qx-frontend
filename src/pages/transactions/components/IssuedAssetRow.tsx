import { useMemo } from 'react'
import { Link } from 'react-router-dom'

import { Skeleton } from '@app/components/ui'
import { EntityLink, ExplorerLink } from '@app/components/ui/links'
import { PublicRoutes } from '@app/router'
import type { IssuedAsset } from '@app/store/apis/qx'
import { ExplorerLinkType } from '@app/types/enums'
import { clsxTwMerge, formatDate, formatString } from '@app/utils'

const genIssuedAssetRowCells = (issuedAsset: IssuedAsset) => [
  {
    key: 'asset',
    content: (
      <Link
        to={PublicRoutes.ASSETS.DETAILS(issuedAsset.source, issuedAsset.extraData.name)}
        className="text-primary-30"
      >
        {issuedAsset.extraData.name}
      </Link>
    )
  },
  {
    key: 'issuer',
    content: <EntityLink value={issuedAsset.source} showTooltip ellipsis />
  },
  {
    key: 'shares',
    content: formatString(issuedAsset.extraData.numberOfShares)
  },
  {
    key: 'tick',
    content: (
      <ExplorerLink
        type={ExplorerLinkType.TICK}
        label={formatString(issuedAsset.tick)}
        value={String(issuedAsset.tick)}
      />
    )
  },
  {
    key: 'decimals',
    content: issuedAsset.extraData.numberOfDecimalPlaces
  },
  {
    key: 'hash',
    content: (
      <ExplorerLink type={ExplorerLinkType.TX} value={issuedAsset.hash} ellipsis showTooltip />
    )
  },

  {
    key: 'date_and_time',
    content: formatDate(issuedAsset.tickTime, {
      excludeTimeZone: true,
      shortDate: true
    }),
    className: '!text-slate-500'
  }
]

function IssuedAssetRowCell({
  children,
  className,
  ...rest
}: React.HTMLAttributes<HTMLTableCellElement> & { className?: string }) {
  return (
    <td
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      align="center"
      className={clsxTwMerge('p-6 text-xxs xs:text-xs md:px-12 md:py-10', className)}
    >
      {children}
    </td>
  )
}

type Props = Readonly<{
  issuedAsset: IssuedAsset
}>

function IssuedAssetRow({ issuedAsset }: Props) {
  const issuedAssetRowCells = useMemo(() => genIssuedAssetRowCells(issuedAsset), [issuedAsset])

  return (
    <tr className="even:bg-primary-60/30">
      {issuedAssetRowCells.map(({ key, content, className }) => (
        <IssuedAssetRowCell key={`issued-asset-row-cell-${key}`} className={className}>
          {content}
        </IssuedAssetRowCell>
      ))}
    </tr>
  )
}

IssuedAssetRow.Skeleton = function IssuedAssetRowSkeleton() {
  return (
    <tr className="animate-pulse border-b border-primary-60">
      <IssuedAssetRowCell>
        <Skeleton className="h-13 w-32 xs:h-16" />
      </IssuedAssetRowCell>
      {Array.from({ length: 6 }).map((_, index) => (
        <IssuedAssetRowCell key={String(`issued-asset-row-cell-skeleton-${index}`)}>
          <Skeleton className="h-13 min-w-88 xs:h-16" />
        </IssuedAssetRowCell>
      ))}
    </tr>
  )
}

export default IssuedAssetRow
