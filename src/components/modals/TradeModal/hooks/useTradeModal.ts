import { useCallback, useState } from 'react'

import { useWalletConnect } from '@app/hooks'
import type { AssetOrderPathParams } from '@app/store/apis/qx'
import { useAddAssetAskOrderMutation, useAddAssetBidOrderMutation } from '@app/store/apis/qx'
import { OrderType } from '@app/types/enums'
import { LogFeature, makeLog } from '@app/utils/logger'
import { formatRTKError } from '@app/utils/rtk'

import type { OrderPayload } from '../trade-modal.types'
import { TradeModalStep } from '../trade-modal.types'

const log = makeLog(LogFeature.TRADE_MODAL)

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
        orderType === OrderType.BID ? triggerBidOrder : triggerAskOrder
      )({
        path: orderPath,
        payload: { from: selectedAccount.address, ...orderPayload }
      })

      log('Transaction payload:', transactionPayload)

      if (transactionPayload.error) {
        throw new Error(formatRTKError(transactionPayload.error))
      }

      const result = await walletClient.sendTransaction(
        selectedAccount.address,
        transactionPayload.data.to,
        transactionPayload.data.amount,
        undefined,
        transactionPayload.data.inputType,
        transactionPayload.data.extraData
      )

      log('Send transaction result', result)

      setModalStep(TradeModalStep.SUCCESS_STATE)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Error while sending transaction:', err)
      setError(err instanceof Error ? err.message : 'An error occurred')
      setModalStep(
        err && typeof err === 'object' && 'code' in err && err.code === 5000
          ? TradeModalStep.DECLINED_STATE
          : TradeModalStep.ERROR_STATE
      )
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
