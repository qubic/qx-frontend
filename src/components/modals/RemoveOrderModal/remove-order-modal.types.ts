import type { z } from 'zod'

import type { RemoveOrderPathSchema, RemoveOrderPayloadSchema } from './remove-order-modal.schemas'

export type OrderPath = z.infer<typeof RemoveOrderPathSchema>
export type OrderPayload = z.infer<typeof RemoveOrderPayloadSchema>
