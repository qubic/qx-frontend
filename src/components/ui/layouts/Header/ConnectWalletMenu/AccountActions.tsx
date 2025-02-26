import { memo } from 'react'
import { useTranslation } from 'react-i18next'

import { LogoutIcon } from '@app/assets/icons'
import { Button, CopyTextButton } from '@app/components/ui/buttons'
import Tooltip from '@app/components/ui/Tooltip'

type Props = {
  address: string
  isConnected: boolean
  onConnect: () => void
  onDisconnect: () => void
}

const AccountActions = memo(({ address, isConnected, onConnect, onDisconnect }: Props) => {
  const { t } = useTranslation()

  if (!isConnected) {
    return (
      <Button onClick={onConnect} size="xs" color="secondary" variant="outlined" className="w-fit">
        {t('global.select')}
      </Button>
    )
  }

  return (
    <div className="flex items-center gap-8">
      <CopyTextButton text={address} />

      <Tooltip tooltipId="disconnect-account-button" content={t('global.disconnect_wallet')}>
        <button
          type="button"
          aria-label="disconnect account"
          onClick={onDisconnect}
          className="flex"
        >
          <LogoutIcon className="size-18 shrink-0 rotate-180 text-gray-50 hover:text-white" />
        </button>
      </Tooltip>
    </div>
  )
})

export default AccountActions
