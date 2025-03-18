import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'

import { QubicQxWhiteLogo } from '@app/assets/icons/logo'
import { isConnectWalletEnabled } from '@app/configs/feature-flags'
import { PublicRoutes } from '@app/router/routes'
import { clsxTwMerge } from '@app/utils'

import LanguagePicker from '../../LanguagePicker'

import BurgerMenu from './BurgerMenu'
import ConnectWalletMenu from './ConnectWalletMenu/ConnectWalletMenu'

export type MenuItem = {
  i18nKey: string
  href: string
}

const MENU_ITEMS: MenuItem[] = [
  {
    i18nKey: 'global.home',
    href: PublicRoutes.HOME
  },
  {
    i18nKey: 'global.assets',
    href: PublicRoutes.ASSETS.ROOT
  },
  {
    i18nKey: 'global.trades',
    href: PublicRoutes.TRADES
  },
  {
    i18nKey: 'global.transactions',
    href: PublicRoutes.TRANSACTIONS
  }
]

export default function Header() {
  const location = useLocation()
  const { t } = useTranslation()

  return (
    <header className="relative mx-auto flex h-[var(--header-height)] items-center justify-center gap-6 border-b border-primary-60 p-12 sm:h-[var(--desktop-header-height)]">
      <Link
        to={PublicRoutes.HOME}
        className="absolute ltr:left-12 ltr:right-auto ltr:sm:left-24 rtl:left-auto rtl:right-12 sm:rtl:right-24"
      >
        <QubicQxWhiteLogo />
      </Link>

      <nav className="hidden md:block">
        <ul className="flex gap-20">
          {MENU_ITEMS.map(({ i18nKey, href }) => (
            <li key={i18nKey}>
              <Link
                to={href}
                className={clsxTwMerge(
                  'hover:text-primary-25',
                  location.pathname === href ? 'text-primary-30' : 'text-gray-50'
                )}
              >
                {t(i18nKey)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="absolute flex items-center gap-8 ltr:right-2 sm:ltr:right-24 rtl:left-2 rtl:flex-row-reverse sm:rtl:left-24">
        {isConnectWalletEnabled && <ConnectWalletMenu />}

        <LanguagePicker />
        <div className="md:hidden">
          <BurgerMenu items={MENU_ITEMS} activePath={location.pathname} />
        </div>
      </div>
    </header>
  )
}
