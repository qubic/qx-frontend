import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useAppDispatch, useWalletConnect } from '@app/hooks'
import type { AssetOrderPathParams } from '@app/store/apis/qx'
import { useRemoveAssetAskOrderMutation, useRemoveAssetBidOrderMutation } from '@app/store/apis/qx'
import { hideModal } from '@app/store/modalSlice'
import { OrderType } from '@app/types/enums'
import { getRPCErrorMessage } from '@app/utils/errors'
import { LogFeature, makeLog } from '@app/utils/logger'
import { formatRTKError } from '@app/utils/rtk'
import { toaster } from '@app/utils/toaster'

import type { OrderPayload } from '../remove-order-modal.types'

const log = makeLog(LogFeature.REMOVE_ORDER_MODAL)

const getToastErrorMessage = (error: unknown, t: (key: string) => string): string => {
  const errorMessage = typeof error === 'string' ? error : String(error)
  if (errorMessage.toLowerCase().includes('request expired')) {
    return t('global.request_expired')
  }
  return getRPCErrorMessage(error, t)
}

type UseRemoveOrderModalInput = Readonly<{
  orderType: OrderType
  orderPath: AssetOrderPathParams
  orderPayload: OrderPayload
}>

type UseRemoveOrderModalOutput = Readonly<{
  handleRemoveOrder: () => Promise<void>
  isLoading: boolean
  error: string | null
}>

export default function useRemoveOrderModal({
  orderType,
  orderPath,
  orderPayload
}: UseRemoveOrderModalInput): UseRemoveOrderModalOutput {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { walletClient, isWalletConnected, selectedAccount } = useWalletConnect()

  const [triggerRemoveBidOrder] = useRemoveAssetBidOrderMutation()
  const [triggerRemoveAskOrder] = useRemoveAssetAskOrderMutation()

  const handleRemoveOrder = useCallback(async () => {
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
      console.error('Error removing order:', err)
      toaster.error(
        `${t('remove_order_modal.error_removing_order')}. ${getToastErrorMessage(err, t)}`
      )
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
    handleRemoveOrder,
    isLoading,
    error
  }
}
