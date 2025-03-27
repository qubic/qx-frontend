import { useCallback, useMemo } from 'react'
import { Trans, useTranslation } from 'react-i18next'

import { QubicConnectLogo, XmarkIcon } from '@app/assets/icons'
import { Button } from '@app/components/ui/buttons'
import { PortalModalWrapper } from '@app/components/ui/modals'
import { useAppDispatch } from '@app/hooks'
import { hideModal } from '@app/store/modalSlice'
import { OrderType } from '@app/types/enums'
import { formatString } from '@app/utils'

import { useRemoveOrderModal } from './hooks'
import type { OrderPath, OrderPayload } from './remove-order-modal.types'

export type RemoveOrderModalProps = Readonly<{
  orderType: OrderType
  orderPath: OrderPath
  orderPayload: OrderPayload
}>

export default function RemoveOrderModal({
  orderType,
  orderPath,
  orderPayload
}: RemoveOrderModalProps) {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const { handleRemoveOrder, isLoading } = useRemoveOrderModal({
    orderType,
    orderPath,
    orderPayload
  })

  const formattedQubic = useMemo(
    () => formatString(orderPayload.numberOfShares * orderPayload.pricePerShare),
    [orderPayload.numberOfShares, orderPayload.pricePerShare]
  )

  const formattedPrice = useMemo(
    () => formatString(orderPayload.pricePerShare),
    [orderPayload.pricePerShare]
  )

  const handleCloseModal = useCallback(() => {
    dispatch(hideModal())
  }, [dispatch])

  return (
    <PortalModalWrapper
      id="cancel-order-modal"
      isOpen
      onClose={handleCloseModal}
      closeOnOutsideClick
    >
      <div className="relative mx-16 flex w-full max-w-400 flex-col rounded-12 border border-primary-60 bg-primary-70 sm:mx-0">
        <header className="relative flex h-fit justify-between p-24">
          <QubicConnectLogo />
          <button type="button" onClick={handleCloseModal} aria-label="close-button">
            <XmarkIcon className="absolute top-14 size-20 text-gray-50 ltr:right-14 rtl:left-14" />
          </button>
        </header>

        <div className="flex-grow basis-1 px-24 pb-24">
          <form className="grid justify-center gap-16">
            <h2 className="text-center text-24 font-bold text-gray-100">
              {t('remove_order_modal.remove_order')}
            </h2>

            <section className="mb-18 grid gap-16">
              <p className="text-center text-sm text-slate-500">
                <Trans
                  i18nKey="remove_order_modal.remove_order_desc"
                  values={{
                    side: OrderType.BID === orderType ? t('global.buy') : t('global.sell'),
                    amount: orderPayload.numberOfShares,
                    asset: orderPath.asset,
                    price: formattedPrice,
                    total: formattedQubic
                  }}
                  components={{
                    side: <strong className="text-gray-400" />,
                    amount: <span className="text-gray-400" />,
                    asset: <span className="text-gray-400" />,
                    price: <span className="text-gray-400" />,
                    total: <span className="text-gray-400" />
                  }}
                />
              </p>
            </section>

            <div className="flex flex-col-reverse gap-20 md:flex-row">
              <Button type="button" onClick={handleCloseModal} variant="text">
                {t('global.cancel')}
              </Button>
              <Button
                type="button"
                onClick={handleRemoveOrder}
                color="red"
                isLoading={isLoading}
                loadingText={t('global.approve_in_wallet')}
                disabled={isLoading}
              >
                {orderType === OrderType.BID
                  ? t('remove_order_modal.remove_buy_order')
                  : t('remove_order_modal.remove_sell_order')}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </PortalModalWrapper>
  )
}
