import { useTranslation } from 'react-i18next'

import { XmarkIcon } from '@app/assets/icons'
import { Button } from '@app/components/ui/buttons'

import { TradeModalStep } from '../trade-modal.types'

const getErrorStepTranslationKeys = (step: TradeModalStep) => {
  switch (step) {
    case TradeModalStep.USER_UNAVAILABLE:
      return {
        titleKey: 'global.cancelled',
        descriptionKey: 'rpc_errors.user_unavailable'
      }
    case TradeModalStep.TICK_EXPIRED:
      return {
        titleKey: 'global.cancelled',
        descriptionKey: 'rpc_errors.tick_expired'
      }
    case TradeModalStep.REQUEST_EXPIRED:
      return {
        titleKey: 'global.cancelled',
        descriptionKey: 'trade_modal.request_expired_state_desc'
      }
    case TradeModalStep.DECLINED_STATE:
      return {
        titleKey: 'global.declined',
        descriptionKey: 'trade_modal.declined_state_desc'
      }
    default:
      return {
        titleKey: 'global.cancelled',
        descriptionKey: 'trade_modal.error_state_desc'
      }
  }
}

type Props = {
  step: TradeModalStep
  onTryAgain: () => void
}

export default function ErrorStep({ step, onTryAgain }: Props) {
  const { t } = useTranslation()

  const { titleKey, descriptionKey } = getErrorStepTranslationKeys(step)

  return (
    <div className="flex h-full flex-col items-center justify-between gap-36">
      <div className="flex flex-col items-center gap-20">
        <h2 className="text-24 font-bold">{t(titleKey)}</h2>
        <div className="size-fit rounded-full bg-red-500">
          <XmarkIcon className="size-64 text-primary-70" />
        </div>
      </div>

      <p className="px-10 text-center text-sm text-slate-500">{t(descriptionKey)}</p>

      <Button className="w-full" onClick={onTryAgain}>
        {t('global.try_again')}
      </Button>
    </div>
  )
}
