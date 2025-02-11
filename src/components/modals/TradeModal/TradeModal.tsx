import { useCallback, useState } from 'react'

import { QubicConnectLogo, XmarkIcon } from '@app/assets/icons'
import { PortalModalWrapper } from '@app/components/ui/modals'
import { useAppDispatch } from '@app/hooks'
import { hideModal } from '@app/store/modalSlice'
import type { OrderType } from '@app/types/enums'

import { ConfirmTradeStep, ErrorStep, SuccessStep } from './components'
import { useTradeModal } from './hooks'
import type { OrderPath, OrderPayload } from './trade-modal.types'
import { TradeModalStep } from './trade-modal.types'

export type TradeModalProps = Readonly<{
  orderType: OrderType
  orderPath: OrderPath
  orderPayload: OrderPayload
}>

export default function TradeModal({ orderType, orderPath, orderPayload }: TradeModalProps) {
  const dispatch = useAppDispatch()
  const [price, setPrice] = useState<number>(orderPayload.pricePerShare)
  const [amount, setAmount] = useState<number>(orderPayload.numberOfShares)

  const { modalStep, handleModalStepChange, handleTrade, isLoading } = useTradeModal({
    orderType,
    orderPath,
    orderPayload: {
      pricePerShare: price,
      numberOfShares: amount
    }
  })

  const handlePriceChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(e.target.value))
  }, [])

  const handleAmountChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value))
  }, [])

  const handleCloseModal = useCallback(() => {
    dispatch(hideModal())
  }, [dispatch])

  const renderModalContent = () => {
    switch (modalStep) {
      case TradeModalStep.CONFIRM_TRADE:
        return (
          <ConfirmTradeStep
            orderType={orderType}
            orderPath={orderPath}
            price={price}
            amount={amount}
            isLoading={isLoading}
            onPriceChange={handlePriceChange}
            onAmountChange={handleAmountChange}
            onConfirmTrade={handleTrade}
            onCloseModal={handleCloseModal}
          />
        )
      case TradeModalStep.SUCCESS_STATE:
        return (
          <SuccessStep
            onTryAgain={() => {
              handleModalStepChange(TradeModalStep.CONFIRM_TRADE)
            }}
          />
        )
      case TradeModalStep.ERROR_STATE:
        return (
          <ErrorStep
            onTryAgain={() => {
              handleModalStepChange(TradeModalStep.CONFIRM_TRADE)
            }}
          />
        )
      default:
        return null
    }
  }

  return (
    <PortalModalWrapper id="trade-modal" isOpen onClose={handleCloseModal} closeOnOutsideClick>
      <div className="relative mx-16 flex min-h-[405px] w-full max-w-480 flex-col rounded-12 border border-primary-60 bg-primary-70 sm:mx-0">
        <header className="relative flex h-fit justify-between p-24">
          <QubicConnectLogo />
          <button type="button" onClick={handleCloseModal} aria-label="close-button">
            <XmarkIcon className="absolute top-14 size-20 text-gray-50 ltr:right-14 rtl:left-14" />
          </button>
        </header>

        <div className="flex-grow basis-1 px-24 pb-24">{renderModalContent()}</div>
      </div>
    </PortalModalWrapper>
  )
}
