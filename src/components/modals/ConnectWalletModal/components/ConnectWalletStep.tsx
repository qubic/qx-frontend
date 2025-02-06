import { QRCodeCanvas } from 'qrcode.react'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { Skeleton } from '@app/components/ui'
import { Button, CopyTextButton } from '@app/components/ui/buttons'
import { WalletConnectionStatus } from '@app/contexts'
import { useWalletConnect } from '@app/hooks'

import { ModalStep } from '../connect-wallet-modal.types'

type Props = Readonly<{
  onModalStepChange: (step: ModalStep) => void
}>

function QrCodeSkeleton() {
  return (
    <>
      <Skeleton className="size-[300px]" />
      <Skeleton className="h-20 w-82" />
    </>
  )
}

function ConnectWalletContent({
  wcUri,
  status
}: {
  wcUri?: string
  status: WalletConnectionStatus
}) {
  const { t } = useTranslation()

  if (status === WalletConnectionStatus.CONNECTING && !wcUri) {
    return (
      <>
        <p>{t('connect_wallet_modal.scan_qr')}</p>
        <QrCodeSkeleton />
      </>
    )
  }

  if (status === WalletConnectionStatus.PROPOSAL_EXPIRED) {
    return <p>{t('connect_wallet_modal.wallet_connection_expired')}</p>
  }

  if (status === WalletConnectionStatus.ERROR) {
    return (
      <p className="text-red-500">{t('connect_wallet_modal.wallet_connection_gen_url_error')}</p>
    )
  }

  if (wcUri) {
    return (
      <>
        <p>{t('connect_wallet_modal.scan_qr')}</p>
        <QRCodeCanvas value={wcUri} size={300} className="size-200 rounded" marginSize={1} />
        <div>
          <CopyTextButton text={wcUri} className="text-sm">
            {t('connect_wallet_modal.copy_uri')}
          </CopyTextButton>
        </div>
      </>
    )
  }

  return null
}

export default function ConnectWalletStep({ onModalStepChange }: Props) {
  const { t } = useTranslation()
  const { wcUri, status, connect } = useWalletConnect()

  const handleCancel = useCallback(
    () => onModalStepChange(ModalStep.CONNECTION_METHOD_SELECT),
    [onModalStepChange]
  )

  return (
    <div className="grid place-items-center gap-24">
      <ConnectWalletContent wcUri={wcUri} status={status} />
      <div className="flex w-full gap-8">
        <Button variant="outlined" onClick={handleCancel}>
          {t('global.cancel')}
        </Button>
        {(status === WalletConnectionStatus.PROPOSAL_EXPIRED ||
          status === WalletConnectionStatus.ERROR) && (
          <Button onClick={connect}>{t('global.try_again')}</Button>
        )}
      </div>
    </div>
  )
}
