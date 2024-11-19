import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'

import { AssetsIcon, TradesIcon, TransactionsIcon } from '@app/assets/icons'
import { Button } from '@app/components/ui/buttons'
import { TextInput } from '@app/components/ui/inputs'
import { PageLayout } from '@app/components/ui/layouts'
import { PublicRoutes } from '@app/router/routes'

const DASHBOARD_MENU_ITEMS = [
  { icon: AssetsIcon, i18nKey: 'global.assets', href: PublicRoutes.ASSETS.ROOT },
  { icon: TradesIcon, i18nKey: 'global.trades', href: PublicRoutes.TRADES },
  { icon: TransactionsIcon, i18nKey: 'global.transactions', href: PublicRoutes.TRANSACTIONS }
]

export default function HomePage() {
  const { t } = useTranslation()
  const [searchTrader, setSearchTrader] = useState<string>('')
  const navigate = useNavigate()

  const handleOnChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTrader(event.target.value)
  }, [])

  const handleSearch = useCallback(() => {
    if (searchTrader) {
      navigate(PublicRoutes.ENTITY(searchTrader))
    }
  }, [navigate, searchTrader])

  return (
    <PageLayout title={t('home_page.qx_dashboard')} className="gap-24">
      <p className="mb-6 max-w-512 text-center text-slate-500">{t('home_page.description')}</p>

      <section className="flex flex-wrap justify-center gap-20">
        {DASHBOARD_MENU_ITEMS.map(({ icon: Icon, i18nKey, href }) => (
          <Link
            key={i18nKey}
            to={href}
            className="flex w-[150px] flex-col place-content-center items-center rounded-lg border border-primary-60 bg-primary-70 p-24 transition-all duration-300 ease-in-out hover:border-primary-30"
          >
            <Icon className="mb-2" />
            <h2 className="text-white">{t(i18nKey)}</h2>
          </Link>
        ))}
      </section>

      <section className="mt-24 grid w-full max-w-480 gap-18">
        <h3 className="text-center text-xl font-semibold">{t('home_page.entity_search')}</h3>
        <p className="text-center text-gray-400">{t('home_page.entity_search_desc')}</p>

        <div className="flex w-full flex-col items-center gap-12 xs:flex-row">
          <TextInput
            placeholder="Enter public ID"
            className="w-full"
            size="xs"
            value={searchTrader}
            onChange={handleOnChange}
          />
          <Button onClick={handleSearch} size="xs" className="w-fit">
            {t('home_page.lookup_trader')}
          </Button>
        </div>
      </section>
    </PageLayout>
  )
}
