import { Link, useLocation } from 'react-router-dom'

import { QubicQxInfoWhiteLogo } from '@app/assets/icons/logo'
import { PublicRoutes } from '@app/router/routes'
import { clsxTwMerge } from '@app/utils'
import { useTranslation } from 'react-i18next'
import LanguagePicker from '../../LanguagePicker'
import { ConnectWalletButton } from '../../buttons'
import BurgerMenu from './BurgerMenu'

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
      <Link to={PublicRoutes.HOME} className="absolute left-12 sm:left-24">
        <QubicQxInfoWhiteLogo />
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
      <div className="absolute right-2 flex items-center gap-8 sm:right-24">
        <ConnectWalletButton
          className="p-10 lg:flex"
          variant="text"
          showIcon
          labelClassName="hidden text-gray-50 lg:block"
        />
        <LanguagePicker />
        <div className="lg:hidden">
          <BurgerMenu items={MENU_ITEMS} activePath={location.pathname} />
        </div>
      </div>
    </header>
  )
}