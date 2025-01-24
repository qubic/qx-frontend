import type { z } from 'zod'

import type { CancelOrderPathSchema, CancelOrderPayloadSchema } from './cancel-order-modal.schemas'

export type OrderPath = z.infer<typeof CancelOrderPathSchema>
export type OrderPayload = z.infer<typeof CancelOrderPayloadSchema>
