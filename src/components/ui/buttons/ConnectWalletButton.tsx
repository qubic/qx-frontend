/* eslint-disable react/jsx-props-no-spreading */
import { useTranslation } from 'react-i18next'

import { ChevronDownIcon, QubicIconDark } from '@app/assets/icons'
import { useAppDispatch, useWalletConnect } from '@app/hooks'
import { ModalType, showModal } from '@app/store/modalSlice'
import { formatEllipsis } from '@app/utils'

import Button, { type ButtonProps } from './Button'

type ConnectWalletButtonProps = Omit<ButtonProps, 'onClick' | 'children'> & {
  labelClassName?: string
  showArrowIcon?: boolean
  onClick?: () => void
}

export default function ConnectWalletButton({
  labelClassName,
  showArrowIcon = false,
  onClick,
  ...buttonProps
}: ConnectWalletButtonProps) {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const { isWalletConnected, selectedAccount } = useWalletConnect()

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      dispatch(showModal({ modalType: ModalType.CONNECT_WALLET }))
    }
  }

  return (
    <Button {...buttonProps} aria-label="Connect Wallet" onClick={handleClick}>
      {isWalletConnected && <QubicIconDark className="size-28 rounded-full border bg-white p-2" />}
      <span className={labelClassName}>
        {isWalletConnected ? formatEllipsis(selectedAccount?.address) : t('global.connect_wallet')}
      </span>
      {showArrowIcon && <ChevronDownIcon className="ml-2 size-20" />}
    </Button>
  )
}
