import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { QubicConnectLogo, XmarkIcon } from '@app/assets/icons'
import { PortalModalWrapper } from '@app/components/ui/modals'
import { useAppDispatch, useWalletConnect } from '@app/hooks'
import { hideModal } from '@app/store/modalSlice'

import { AccountSelectStep, ConnectionMethodSelectStep, ConnectWalletStep } from './components'
import { ModalStep } from './connect-wallet-modal.types'

export default function ConnectWalletModal() {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const [modalStep, setModalStep] = useState<ModalStep>(ModalStep.CONNECTION_METHOD_SELECT)

  const {
    session,
    connect: wcConnect,
    disconnect: wcDisconnect,
    accounts,
    selectedAccount: wcSelectedAccount,
    setSelectedAccount: setWcSelectedAccount,
    isWalletConnected
  } = useWalletConnect()

  const handleCloseModal = useCallback(() => {
    dispatch(hideModal())
  }, [dispatch])

  const handleModalStepChange = useCallback((step: ModalStep) => {
    setModalStep(step)
  }, [])

  const handleSelectWalletConnect = useCallback(async () => {
    setModalStep(ModalStep.WC_CONNECT_WALLET)
    await wcConnect()
  }, [wcConnect])

  const handleConfirmAccountSelection = useCallback(() => {
    toast.success(t('connect_wallet_modal.account_connected'))
    handleCloseModal()
  }, [handleCloseModal, t])

  const handleDisconnectWallet = useCallback(() => {
    if (session) {
      wcDisconnect()
      handleCloseModal()
    }
  }, [session, wcDisconnect, handleCloseModal])

  useEffect(() => {
    if (isWalletConnected && !wcSelectedAccount) {
      setModalStep(ModalStep.WC_ACCOUNT_SELECT)
    }
  }, [wcSelectedAccount, isWalletConnected])

  const renderModalContent = () => {
    switch (modalStep) {
      case ModalStep.CONNECTION_METHOD_SELECT:
        return (
          <ConnectionMethodSelectStep
            isWalletConnected={isWalletConnected}
            onModalStepChange={handleModalStepChange}
            onDisconnectWallet={handleDisconnectWallet}
            onSelectWalletConnect={handleSelectWalletConnect}
          />
        )
      case ModalStep.WC_CONNECT_WALLET:
        return <ConnectWalletStep onModalStepChange={handleModalStepChange} />
      case ModalStep.WC_ACCOUNT_SELECT:
        return (
          <AccountSelectStep
            accounts={accounts}
            selectedAccount={wcSelectedAccount}
            setSelectedAccount={setWcSelectedAccount}
            onModalStepChange={handleModalStepChange}
            onConfirm={handleConfirmAccountSelection}
          />
        )
      default:
        return null
    }
  }

  return (
    <PortalModalWrapper
      id="connect-wallet-modal"
      isOpen
      onClose={handleCloseModal}
      closeOnOutsideClick
    >
      <div className="relative mx-16 grid w-full max-w-480 rounded-12 border border-primary-60 bg-primary-70 sm:mx-0">
        <header className="relative flex h-fit justify-between p-24">
          <QubicConnectLogo />
          <button type="button" onClick={handleCloseModal} aria-label="close-button">
            <XmarkIcon className="absolute top-14 size-20 text-gray-50 ltr:right-14 rtl:left-14" />
          </button>
        </header>

        <div className="px-28 pb-28 pt-12">{renderModalContent()}</div>
      </div>
    </PortalModalWrapper>
  )
}
