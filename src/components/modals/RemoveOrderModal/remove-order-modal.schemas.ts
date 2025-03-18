import { z } from 'zod'

import { OrderTypeSchema } from '@app/schemas'

export const RemoveOrderPathSchema = z.object({
  issuer: z.string(),
  asset: z.string()
})

export const RemoveOrderPayloadSchema = z.object({
  pricePerShare: z.number(),
  numberOfShares: z.number()
})

export const RemoveOrderModalPropsSchema = z.object({
  orderType: OrderTypeSchema,
  orderPath: RemoveOrderPathSchema,
  orderPayload: RemoveOrderPayloadSchema
})
