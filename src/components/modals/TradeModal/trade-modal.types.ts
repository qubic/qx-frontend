import type { z } from 'zod'

import type { OrderPathSchema, OrderPayloadSchema } from './trade-modal.schemas'

export enum TradeModalStep {
  CONFIRM_TRADE = 'confirm-trade',
  SUCCESS_STATE = 'success-state',
  // Error states
  DECLINED_STATE = 'declined-state',
  ERROR_STATE = 'error-state',
  USER_UNAVAILABLE = 'user_unavailable',
  TICK_EXPIRED = 'tick_expired',
  REQUEST_EXPIRED = 'request_expired'
}

export type OrderPath = z.infer<typeof OrderPathSchema>
export type OrderPayload = z.infer<typeof OrderPayloadSchema>
