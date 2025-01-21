import { useTranslation } from 'react-i18next'

import { XmarkIcon } from '@app/assets/icons'
import { Button } from '@app/components/ui/buttons'

type Props = {
  onTryAgain: () => void
}

export default function ErrorStep({ onTryAgain }: Props) {
  const { t } = useTranslation()

  return (
    <div className="flex h-full flex-col items-center justify-between gap-36">
      <div className="flex flex-col items-center gap-20">
        <h2 className="text-24 font-bold">{t('global.cancelled')}</h2>
        <div className="size-fit rounded-full bg-red-500">
          <XmarkIcon className="size-64 text-primary-70" />
        </div>
      </div>

      <p className="px-10 text-center text-sm text-slate-500">
        {t('trade_modal.error_state_desc')}
      </p>

      <Button className="w-full" onClick={onTryAgain}>
        {t('global.try_again')}
      </Button>
    </div>
  )
}
