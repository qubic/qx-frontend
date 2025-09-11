import type { Asset } from '@app/store/apis/qx'

import AssetCard from './AssetCard'

type Props = {
  title: string
  assets: Asset[]
  isLoading?: boolean
  skeletonQty?: number
}

function AssetsSkeleton({ title, qty }: { title: string; qty: number }) {
  return Array.from({ length: qty }).map((_, index) => (
    <AssetCard.Skeleton key={`${title}-${String(index)}`} />
  ))
}

export default function AssetsSection({ title, assets, isLoading, skeletonQty = 6 }: Props) {
  return (
    <section className="grid place-items-center gap-24">
      <h2 className="text-xl font-semibold">{title}</h2>
      <ul className="mx-auto flex w-full max-w-full flex-wrap justify-center gap-4 sm:gap-8 md:max-w-lg">
        {isLoading ? (
          <AssetsSkeleton title={title} qty={skeletonQty} />
        ) : (
          assets.map((asset) => (
            <li key={asset.name}>
              <AssetCard asset={asset} />
            </li>
          ))
        )}
      </ul>
    </section>
  )
}
