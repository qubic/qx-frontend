import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '@app/components/ui/buttons'
import { TextInput } from '@app/components/ui/inputs'
import { useWalletConnect } from '@app/hooks'
import { useGetLatestStatsQuery } from '@app/store/apis/qubic-rpc'
import { OrderType } from '@app/types/enums'
import { formatString } from '@app/utils'

import type { OrderPath } from '../trade-modal.types'
import { confirmTradeValidator } from '../trade-modal.validators'

type Props = {
  orderType: OrderType
  orderPath: OrderPath
  price: number
  amount: number
  isLoading: boolean
  onPriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onConfirmTrade: () => void
  onCloseModal: () => void
}

export default function ConfirmTradeStep({
  orderType,
  orderPath,
  price,
  amount,
  isLoading,
  onPriceChange,
  onAmountChange,
  onConfirmTrade,
  onCloseModal
}: Props) {
  const { t } = useTranslation()
  const { data: latestStats } = useGetLatestStatsQuery(undefined)
  const { selectedAccount } = useWalletConnect()

  const totalQubic = price * amount
  const amountUsdt = totalQubic * (latestStats?.price || 0)
  const formattedQubic = useMemo(() => formatString(totalQubic), [totalQubic])
  const formattedAmountUsdt = useMemo(
    () => formatString(amountUsdt, amountUsdt > 1 ? 2 : 8),
    [amountUsdt]
  )

  const userAssetBalance = useMemo(
    () => selectedAccount?.assets?.find((a) => a.assetName === orderPath.asset)?.ownedAmount ?? 0,
    [selectedAccount, orderPath.asset]
  )

  const errors = useMemo(
    () =>
      confirmTradeValidator(
        {
          price,
          amount
        },
        {
          totalQubic,
          userQubicBalance: selectedAccount?.amount ?? 0,
          userAssetBalance,
          orderType,
          asset: orderPath.asset
        },
        t
      ),
    [
      price,
      amount,
      totalQubic,
      selectedAccount?.amount,
      userAssetBalance,
      orderType,
      orderPath.asset,
      t
    ]
  )

  return (
    <form className="grid justify-center gap-16">
      <h2 className="text-center text-24 font-bold text-gray-100">
        {t('trade_modal.order_confirmation')}
      </h2>

      <div className="my-18 grid gap-16">
        <TextInput
          type="number"
          placeholder="0"
          startIcon="Price"
          endIcon="QUBIC"
          hideNumberInputArrows
          onChange={onPriceChange}
          value={price === 0 ? '' : price}
          min={1}
          error={errors.price}
        />
        <TextInput
          type="number"
          placeholder="0"
          startIcon="Amount"
          endIcon={orderPath.asset}
          hideNumberInputArrows
          onChange={onAmountChange}
          value={amount === 0 ? '' : amount}
          min={1}
          error={errors.amount}
        />
        <div className="flex space-x-4">
          <p className="w-full text-right text-sm text-slate-500">{t('global.total')}</p>
          <p className="whitespace-nowrap text-right text-sm text-slate-500">
            <span className="text-white">{formattedQubic || '--'}</span> QUBIC
            <br />
            <span className="text-white">{formattedAmountUsdt || '--'}</span> USDT
          </p>
        </div>
      </div>

      <div className="flex flex-col-reverse gap-20 md:flex-row">
        <Button type="button" onClick={onCloseModal} variant="text">
          {t('global.cancel')}
        </Button>
        <Button
          type="button"
          onClick={onConfirmTrade}
          color={OrderType.BID === orderType ? 'green' : 'red'}
          isLoading={isLoading}
          loadingText={t('global.approve_in_wallet')}
          disabled={isLoading || Object.values(errors).some(Boolean)}
        >
          {OrderType.BID === orderType
            ? t('trade_modal.place_buy_order')
            : t('trade_modal.place_sell_order')}
        </Button>
      </div>
    </form>
  )
}
