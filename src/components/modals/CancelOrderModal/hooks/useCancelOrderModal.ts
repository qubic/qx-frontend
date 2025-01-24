import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useAppDispatch, useWalletConnect } from '@app/hooks'
import type { AssetOrderPathParams } from '@app/store/apis/qx'
import { useRemoveAssetAskOrderMutation, useRemoveAssetBidOrderMutation } from '@app/store/apis/qx'
import { hideModal } from '@app/store/modalSlice'
import { OrderType } from '@app/types/enums'
import { LogFeature, makeLog } from '@app/utils/logger'
import { formatRTKError } from '@app/utils/rtk'
import { toaster } from '@app/utils/toaster'

import type { OrderPayload } from '../cancel-order-modal.types'

const log = makeLog(LogFeature.CANCEL_ORDER_MODAL)

type UseCancelOrderModalInput = Readonly<{
  orderType: OrderType
  orderPath: AssetOrderPathParams
  orderPayload: OrderPayload
}>

type UseCancelOrderModalOutput = Readonly<{
  handleCancelOrder: () => Promise<void>
  isLoading: boolean
  error: string | null
}>

export default function useCancelOrderModal({
  orderType,
  orderPath,
  orderPayload
}: UseCancelOrderModalInput): UseCancelOrderModalOutput {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { walletClient, isWalletConnected, selectedAccount } = useWalletConnect()

  const [triggerRemoveBidOrder] = useRemoveAssetBidOrderMutation()
  const [triggerRemoveAskOrder] = useRemoveAssetAskOrderMutation()

  const handleCancelOrder = useCallback(async () => {
    try {
      if (!walletClient) {
        throw new Error('Wallet client not found')
      }

      if (!isWalletConnected || !selectedAccount) {
        throw new Error('Wallet not connected')
      }

      setIsLoading(true)

      const transactionPayload = await (
        orderType === OrderType.BID ? triggerRemoveBidOrder : triggerRemoveAskOrder
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
      log({ result })
      toaster.cancelOrder(t, result.tick, result.transactionId)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Error while sending cancel order transaction:', err)
      toaster.error('Error while sending transaction to cancel order')
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      dispatch(hideModal())
      setIsLoading(false)
    }
  }, [
    dispatch,
    isWalletConnected,
    orderPath,
    orderPayload,
    orderType,
    selectedAccount,
    t,
    triggerRemoveAskOrder,
    triggerRemoveBidOrder,
    walletClient
  ])

  return {
    handleCancelOrder,
    isLoading,
    error
  }
}
