import { z } from 'zod'

import { OrderTypeSchema } from '@app/schemas'

export const OrderPathSchema = z.object({
  issuer: z.string(),
  asset: z.string()
})

export const OrderPayloadSchema = z.object({
  pricePerShare: z.number(),
  numberOfShares: z.number()
})

export const TradeModalPropsSchema = z.object({
  orderType: OrderTypeSchema,
  orderPath: OrderPathSchema,
  orderPayload: OrderPayloadSchema
})
