import { QRCodeCanvas } from 'qrcode.react'
import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { XmarkIcon } from '@app/assets/icons'
import { Skeleton } from '@app/components/ui'
import { Button, CopyTextButton } from '@app/components/ui/buttons'
import { WalletConnectionStatus } from '@app/contexts'
import { useWalletConnect } from '@app/hooks'

import { ModalStep } from '../connect-wallet-modal.types'

const RETRYABLE_STATUSES = [
  WalletConnectionStatus.USER_REJECTED_CONNECTION,
  WalletConnectionStatus.PROPOSAL_EXPIRED,
  WalletConnectionStatus.ERROR
]

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

  const statusContentMap: Partial<Record<WalletConnectionStatus, React.JSX.Element | null>> = {
    [WalletConnectionStatus.CONNECTING]: !wcUri ? (
      <>
        <p>{t('connect_wallet_modal.scan_qr')}</p>
        <QrCodeSkeleton />
      </>
    ) : null,
    [WalletConnectionStatus.USER_REJECTED_CONNECTION]: (
      <>
        <div className="flex flex-col items-center gap-12">
          <h2 className="text-24 font-bold">{t('global.declined')}</h2>
          <div className="size-fit rounded-full bg-red-500">
            <XmarkIcon className="size-64 text-primary-70" />
          </div>
        </div>
        <p>{t('connect_wallet_modal.user_rejected_connection')}</p>
      </>
    ),
    [WalletConnectionStatus.PROPOSAL_EXPIRED]: (
      <p>{t('connect_wallet_modal.wallet_connection_expired')}</p>
    ),
    [WalletConnectionStatus.ERROR]: (
      <p className="text-red-500">{t('connect_wallet_modal.wallet_connection_gen_url_error')}</p>
    )
  }

  if (statusContentMap[status]) {
    return statusContentMap[status]
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

  const shouldShowRetry = useMemo(() => RETRYABLE_STATUSES.includes(status), [status])

  return (
    <div className="grid place-items-center gap-24">
      <ConnectWalletContent wcUri={wcUri} status={status} />
      <div className="flex w-full gap-8">
        <Button variant="outlined" onClick={handleCancel}>
          {t('global.cancel')}
        </Button>
        {shouldShowRetry && <Button onClick={connect}>{t('global.try_again')}</Button>}
      </div>
    </div>
  )
}
