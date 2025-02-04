import type { EntityOrder } from '@app/store/apis/qx'
import type { OrderType } from '@app/types/enums'

export type EntityOrderWithType = EntityOrder & {
  orderType: OrderType
}
