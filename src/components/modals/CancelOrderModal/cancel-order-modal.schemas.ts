import { z } from 'zod'

import { OrderTypeSchema } from '@app/schemas'

export const CancelOrderPathSchema = z.object({
  issuer: z.string(),
  asset: z.string()
})

export const CancelOrderPayloadSchema = z.object({
  pricePerShare: z.number(),
  numberOfShares: z.number()
})

export const CancelOrderModalPropsSchema = z.object({
  orderType: OrderTypeSchema,
  orderPath: CancelOrderPathSchema,
  orderPayload: CancelOrderPayloadSchema
})
