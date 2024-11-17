import { ConnectWalletButton } from '@app/components/ui/buttons'
import { useWalletConnect } from '@app/hooks'

export default function HomePage() {
  const { isWalletConnected } = useWalletConnect()

  return (
    <div className="w-full pb-72 pt-60 lg:pt-120">
      <div className="mx-auto flex w-fit flex-1 flex-col gap-80 lg:flex-row">
        <section className="grid h-fit max-w-[416px] place-items-center gap-24 lg:place-items-start">
          {isWalletConnected ? (
            <p>Connected</p>
          ) : (
            <ConnectWalletButton size="sm" className="w-fit" />
          )}
        </section>
      </div>
    </div>
  )
}
