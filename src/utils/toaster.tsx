import type { TFunction } from 'i18next'
import toast from 'react-hot-toast'
import { Trans } from 'react-i18next'

import { ExplorerLink } from '@app/components/ui/links'
import { ExplorerLinkType } from '@app/types/enums'

import { formatString } from '.'
import { makeExplorerTickUrl } from './explorer'

export const toaster = {
  /**
   * Shows success toast for canceled order with a link to the explorer
   */
  cancelOrder: (t: TFunction, tick: number, transactionId: string) => {
    toast.success(
      <div>
        <Trans
          i18nKey="remove_order_modal.remove_order_success"
          values={{ tick: formatString(tick) }}
          components={{
            tick: (
              // eslint-disable-next-line jsx-a11y/control-has-associated-label, jsx-a11y/anchor-has-content -- Trans component provides the content to anchor
              <a
                href={makeExplorerTickUrl(String(tick))}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-40"
              />
            )
          }}
        />
        <ExplorerLink
          className="text-base text-primary-40 underline xs:text-base"
          label={t('global.view_on_explorer')}
          value={transactionId}
          type={ExplorerLinkType.TX}
        />
      </div>,
      { duration: 20000 }
    )
  },

  /**
   * Generic success toast
   */
  success: (message: string) => {
    toast.success(message, { duration: 5000 })
  },

  /**
   * Generic error toast
   */
  error: (message: string) => {
    toast.error(message, { duration: 5000 })
  },

  /**
   * Generic info toast
   */
  info: (message: string) => {
    toast(message, { duration: 7000 })
  },

  /**
   * Dismiss all toast messages
   */
  dismissAll: () => {
    toast.dismiss()
  }
}

export default toaster
