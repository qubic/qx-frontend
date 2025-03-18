import { z } from 'zod'

import { OrderType } from '@app/types/enums'

export const OrderTypeSchema = z.nativeEnum(OrderType)
