import { useCallback, useState } from 'react'

import { useWalletConnect } from '@app/hooks'
import type { AssetOrderPathParams } from '@app/store/apis/qx'
import { useAddAssetAskOrderMutation, useAddAssetBidOrderMutation } from '@app/store/apis/qx'
import { OrderType } from '@app/types/enums'

import type { OrderPayload } from '../trade-modal.types'
import { TradeModalStep } from '../trade-modal.types'

type UseTradeModalInput = Readonly<{
  orderType: OrderType
  orderPath: AssetOrderPathParams
  orderPayload: OrderPayload
}>

type UseTradeModalOutput = Readonly<{
  modalStep: TradeModalStep
  handleModalStepChange: (step: TradeModalStep) => void
  handleTrade: () => Promise<void>
  isLoading: boolean
  error: string | null
}>

export default function useTradeModal({
  orderType,
  orderPath,
  orderPayload
}: UseTradeModalInput): UseTradeModalOutput {
  const [modalStep, setModalStep] = useState<TradeModalStep>(TradeModalStep.CONFIRM_TRADE)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { walletClient, isWalletConnected, selectedAccount } = useWalletConnect()

  const [triggerBidOrder] = useAddAssetBidOrderMutation()
  const [triggerAskOrder] = useAddAssetAskOrderMutation()

  const handleTrade = useCallback(async () => {
    try {
      if (!walletClient) {
        throw new Error('Wallet client not found')
      }

      if (!isWalletConnected || !selectedAccount) {
        throw new Error('Wallet not connected')
      }

      setIsLoading(true)

      const transactionPayload = await (
        orderType === OrderType.BID ? triggerAskOrder : triggerBidOrder
      )({
        path: orderPath,
        payload: { from: selectedAccount.address, ...orderPayload }
      })

      if (transactionPayload.error) {
        // eslint-disable-next-line no-console
        console.error('Error:', transactionPayload.error)
        return
      }

      await walletClient.sendTransaction(
        selectedAccount.address,
        transactionPayload.data.to,
        transactionPayload.data.amount,
        undefined,
        transactionPayload.data.inputType,
        transactionPayload.data.extraData
      )

      setModalStep(TradeModalStep.SUCCESS_STATE)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Error while sending transaction:', err)
      setError(err instanceof Error ? err.message : 'An error occurred')
      setModalStep(TradeModalStep.ERROR_STATE)
    } finally {
      setIsLoading(false)
    }
  }, [
    isWalletConnected,
    orderPath,
    orderPayload,
    orderType,
    selectedAccount,
    triggerAskOrder,
    triggerBidOrder,
    walletClient
  ])

  return {
    modalStep,
    handleModalStepChange: setModalStep,
    handleTrade,
    isLoading,
    error
  }
}
