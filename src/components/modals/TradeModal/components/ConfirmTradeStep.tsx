import { useTranslation } from 'react-i18next'

import { Button } from '@app/components/ui/buttons'
import { TextInput } from '@app/components/ui/inputs'
import { useGetLatestStatsQuery } from '@app/store/apis/qubic-rpc'
import { OrderType } from '@app/types/enums'
import { formatString } from '@app/utils'

import type { OrderPath } from '../trade-modal.types'

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

  const totalQubic = price * amount
  const amountUsdt = totalQubic * (latestStats?.price || 0)
  const formattedQubic = formatString(totalQubic)
  const formattedAmountUsdt = formatString(amountUsdt, amountUsdt > 1 ? 2 : 8)

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
          value={price}
          min={0}
        />
        <TextInput
          type="number"
          placeholder="0"
          startIcon="Amount"
          endIcon={orderPath.asset}
          hideNumberInputArrows
          onChange={onAmountChange}
          value={amount}
          min={0}
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

      <div className="flex gap-20">
        <Button type="button" onClick={onCloseModal} variant="text">
          {t('global.cancel')}
        </Button>
        <Button
          type="button"
          onClick={onConfirmTrade}
          color={OrderType.BID === orderType ? 'red' : 'green'}
          isLoading={isLoading}
          loadingText={t('trade_modal.placing_order')}
          disabled={isLoading || !price || !amount}
        >
          {OrderType.BID === orderType
            ? t('trade_modal.place_sell_order')
            : t('trade_modal.place_buy_order')}
        </Button>
      </div>
    </form>
  )
}
