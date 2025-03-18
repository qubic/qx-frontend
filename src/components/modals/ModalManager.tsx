/* eslint-disable react/jsx-props-no-spreading */
import { z } from 'zod'

import { useAppSelector } from '@app/hooks'
import type { ModalProps } from '@app/store/modalSlice'
import { ModalType, selectModal } from '@app/store/modalSlice'

import { ConnectWalletModal } from './ConnectWalletModal'
import { RemoveOrderModalPropsSchema } from './RemoveOrderModal/remove-order-modal.schemas'
import RemoveOrderModal from './RemoveOrderModal/RemoveOrderModal'
import { TradeModal } from './TradeModal'
import { TradeModalPropsSchema } from './TradeModal/trade-modal.schemas'

const MODAL_SCHEMAS = {
  [ModalType.NONE]: z.undefined(),
  [ModalType.CONNECT_WALLET]: z.undefined(),
  [ModalType.CONFIRM_TRADE]: TradeModalPropsSchema,
  [ModalType.REMOVE_ORDER]: RemoveOrderModalPropsSchema
}

function isValidModalProps<T extends ModalType>(
  modalType: T,
  modalProps: unknown
): modalProps is ModalProps[T] {
  const schema = MODAL_SCHEMAS[modalType]
  const result = schema.safeParse(modalProps)
  return result.success
}

export default function ModalManager() {
  const { modalType, modalProps } = useAppSelector(selectModal)

  if (!isValidModalProps(modalType, modalProps)) {
    // eslint-disable-next-line no-console
    console.error(`Invalid modal props for modal type: ${modalType}. Props: ${modalProps}`)
    return null
  }

  switch (modalType) {
    case ModalType.CONNECT_WALLET:
      return <ConnectWalletModal />

    case ModalType.CONFIRM_TRADE:
      return <TradeModal {...(modalProps as ModalProps[ModalType.CONFIRM_TRADE])} />

    case ModalType.REMOVE_ORDER:
      return <RemoveOrderModal {...(modalProps as ModalProps[ModalType.REMOVE_ORDER])} />

    case ModalType.NONE:
    default:
      return null
  }
}
