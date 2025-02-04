import type { z } from 'zod'

import type { OrderPathSchema, OrderPayloadSchema } from './trade-modal.schemas'

export enum TradeModalStep {
  CONFIRM_TRADE = 'confirm-trade',
  SUCCESS_STATE = 'success-state',
  ERROR_STATE = 'error-state'
}

export type OrderPath = z.infer<typeof OrderPathSchema>
export type OrderPayload = z.infer<typeof OrderPayloadSchema>
