import { Trans, useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'

import { QubicQxWhiteLogo } from '@app/assets/icons/logo'
import WarningIcon from '@app/assets/icons/warning.svg'
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
    <header className="relative mx-auto w-full border-b border-primary-60">
      {/* Top bar keeps its fixed height */}
      <div className="relative mx-auto flex h-[var(--header-height)] items-center justify-center gap-6 p-12 sm:h-[var(--desktop-header-height)]">
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
      </div>

      {/* Banner row — full width on mobile, centered & constrained on larger screens */}
      <div className="px-12 pb-12">
        <div
          role="alert"
          className="mx-auto max-w-2xl rounded-12 border-1 border-warning-40 bg-transparent p-3 text-center md:w-[40vw]"
        >
          <div className="mb-2 flex items-center justify-center">
            <img
              alt=""
              src={WarningIcon}
              className="mr-6 h-20 w-20" // <- margin-right ensures spacing
            />
            <h2 className="text-lg font-bold text-warning-40">{t('no_maintenance.title')}</h2>
          </div>
          <p className="text-m col-span-2 mt-1 leading-snug text-gray-50">
            <Trans
              i18nKey="no_maintenance.body"
              components={{
                a1: (
                  <a
                    href="https://www.qxboard.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="QXBoard"
                    className="font-semibold underline hover:text-primary-30"
                  />
                ),
                a2: (
                  <a
                    href="https://qubictrade.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="QubicTrade"
                    className="font-semibold underline hover:text-primary-30"
                  />
                )
              }}
            />
          </p>
        </div>
      </div>
    </header>
  )
}
