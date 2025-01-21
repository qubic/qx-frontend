import { Link } from 'react-router-dom'

import { Skeleton } from '@app/components/ui'
import { PublicRoutes } from '@app/router'
import type { Asset } from '@app/store/apis/qx'

type Props = {
  asset: Asset
}

function AssetCard({ asset }: Props) {
  return (
    <Link
      key={asset.name}
      to={PublicRoutes.ASSETS.DETAILS(asset.issuer, asset.name)}
      className="flex w-[174px] flex-col justify-center gap-6 break-words rounded-12 border-1 border-primary-60 bg-primary-70 p-24 transition-all duration-300 ease-in-out hover:border-primary-30"
    >
      <span className="text-center text-lg font-bold">{asset.name}</span>
      <span className="font-mono text-xxs text-slate-500">{asset.issuer}</span>
    </Link>
  )
}

AssetCard.Skeleton = function AssetCardSkeleton() {
  return <Skeleton className="h-[118px] w-[174px] rounded-12" />
}

export default AssetCard
