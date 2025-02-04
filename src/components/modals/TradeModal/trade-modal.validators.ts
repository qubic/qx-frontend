import type { TFunction } from 'i18next'
import { z } from 'zod'

import { OrderType } from '@app/types/enums'

const tradeSchema = z.object({
  price: z.number().positive(),
  amount: z.number().positive()
})

type TradeValidatorCtx = {
  orderType: OrderType
  asset: string
  totalQubic: number
  userQubicBalance: number
  userAssetBalance: number
}

export const confirmTradeValidator = (
  data: z.input<typeof tradeSchema>,
  ctx: TradeValidatorCtx,
  t: TFunction
) => {
  const result = tradeSchema.safeParse(data)
  const errors: Partial<Record<keyof typeof data, string>> = {}

  if (!result.success) {
    result.error.errors.forEach((err) => {
      errors[err.path[0] as keyof typeof data] = t(`trade_modal.errors.${err.path[0]}`)
    })
  }
  if (ctx.totalQubic > ctx.userQubicBalance && ctx.orderType === OrderType.ASK) {
    errors.price = t('trade_modal.errors.not_enough_qubic')
  }
  if (data.amount > ctx.userAssetBalance && ctx.orderType === OrderType.BID) {
    errors.amount = t('trade_modal.errors.not_enough_asset', { asset: ctx.asset })
  }

  return errors
}
