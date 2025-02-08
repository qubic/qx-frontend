import type { TFunction } from 'i18next'
import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { TrashIcon } from '@app/assets/icons'
import type { OrderPayload } from '@app/components/modals/RemoveOrderModal/remove-order-modal.types'
import { Skeleton } from '@app/components/ui'
import { EntityLink } from '@app/components/ui/links'
import { TableRowCell } from '@app/components/ui/tables'
import { useAppDispatch, useWalletConnect } from '@app/hooks'
import { PublicRoutes } from '@app/router'
import { ModalType, showModal } from '@app/store/modalSlice'
import type { TableRows } from '@app/types'
import { OrderType } from '@app/types/enums'
import { formatString } from '@app/utils'

import { PRIVATE_ENTITY_ORDERS_TABLE_ROWS_KEYS } from '../constants'
import type { EntityOrderWithType } from '../types'

const genEntityOrderRowCells = (
  entityOrder: EntityOrderWithType,
  isEntityOwner: boolean,
  onRowActionClick: (orderType: OrderType, orderPayload: OrderPayload) => void,
  t: TFunction
): TableRows => {
  const tableRows = [
    {
      key: 'asset',
      content: (
        <Link
          to={PublicRoutes.ASSETS.DETAILS(entityOrder.issuerId, entityOrder.assetName)}
          className="text-primary-30"
        >
          {entityOrder.assetName}
        </Link>
      )
    },
    {
      key: 'issuer',
      content: <EntityLink value={entityOrder.issuerId} showTooltip ellipsis />
    },
    {
      key: 'side',
      content:
        entityOrder.orderType === OrderType.BID ? (
          <span className="text-success-40">{t('global.buy')}</span>
        ) : (
          <span className="text-red-500">{t('global.sell')}</span>
        )
    },
    {
      key: 'price',
      content: formatString(entityOrder.price),
      align: 'right' as const
    },
    {
      key: 'amount',
      content: formatString(entityOrder.numberOfShares),
      align: 'right' as const
    },
    {
      key: 'total',
      content: formatString(entityOrder.numberOfShares * entityOrder.price),
      align: 'right' as const
    },
    {
      key: 'remove',
      content: (
        <button
          type="button"
          onClick={() =>
            onRowActionClick(entityOrder.orderType, {
              pricePerShare: entityOrder.price,
              numberOfShares: entityOrder.numberOfShares
            })
          }
        >
          <TrashIcon className="size-18 text-slate-500 transition-colors duration-200 hover:text-white" />
        </button>
      )
    }
  ]

  if (!isEntityOwner) {
    return tableRows.filter(({ key }) => !PRIVATE_ENTITY_ORDERS_TABLE_ROWS_KEYS.includes(key))
  }

  return tableRows
}

type Props = Readonly<{
  entityOrder: EntityOrderWithType
  isEntityOwner: boolean
}>

function EntityOrderRow({ entityOrder, isEntityOwner }: Props) {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { isWalletConnected } = useWalletConnect()

  const handleRowActionClick = useCallback(
    (orderType: OrderType, orderPayload: OrderPayload) => {
      if (!isWalletConnected) {
        dispatch(showModal({ modalType: ModalType.REMOVE_ORDER }))
      } else {
        dispatch(
          showModal({
            modalType: ModalType.REMOVE_ORDER,
            modalProps: {
              orderType,
              orderPath: {
                asset: entityOrder.assetName,
                issuer: entityOrder.issuerId
              },
              orderPayload
            }
          })
        )
      }
    },
    [dispatch, entityOrder.assetName, entityOrder.issuerId, isWalletConnected]
  )

  const EntityOrderRowCells = useMemo(
    () => genEntityOrderRowCells(entityOrder, isEntityOwner, handleRowActionClick, t),
    [entityOrder, handleRowActionClick, isEntityOwner, t]
  )

  return (
    <tr className="even:bg-primary-60/30">
      {EntityOrderRowCells.map(({ key, content, align }) => (
        <TableRowCell key={`entity-order-row-cell-${key}`} align={align}>
          {content}
        </TableRowCell>
      ))}
    </tr>
  )
}

EntityOrderRow.Skeleton = function EntityOrderRowSkeleton() {
  return (
    <tr className="animate-pulse border-b border-primary-60">
      <TableRowCell>
        <Skeleton className="h-13 w-32 xs:h-16" />
      </TableRowCell>
      {Array.from({ length: 4 }).map((_, index) => (
        <TableRowCell key={String(`entity-order-row-cell-skeleton-${index}`)}>
          <Skeleton className="h-13 min-w-88 xs:h-16" />
        </TableRowCell>
      ))}
    </tr>
  )
}

export default EntityOrderRow
