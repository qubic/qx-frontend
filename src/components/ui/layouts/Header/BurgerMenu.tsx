import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { Bars3Icon, XmarkIcon } from '@app/assets/icons'
import { DropdownMenu } from '@app/components/ui'
import { clsxTwMerge } from '@app/utils'

import type { MenuItem } from './Header'

type Props = {
  items: MenuItem[]
  activePath: string
}

export default function BurgerMenu({ items, activePath }: Props) {
  const [showMenu, setShowMenu] = useState(false)
  const { t } = useTranslation()

  const handleToggleMenu = useCallback(() => {
    setShowMenu((prev) => !prev)
  }, [])

  return (
    <DropdownMenu show={showMenu} onToggle={handleToggleMenu}>
      <DropdownMenu.Trigger className="rounded-full p-8 hover:bg-primary-60/80">
        <div className="relative size-24">
          <XmarkIcon
            className={clsxTwMerge(
              'absolute inset-0 size-24 transition-all duration-1000 ease-in-out',
              showMenu ? 'rotate-0 opacity-100' : 'rotate-180 opacity-0'
            )}
          />
          <Bars3Icon
            className={clsxTwMerge(
              'absolute inset-0 size-24 transition-all duration-1000 ease-in-out',
              showMenu ? 'rotate-180 opacity-0' : 'rotate-0 opacity-100'
            )}
          />
        </div>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <ul className="grid gap-12 p-24">
          {items.map(({ i18nKey, href }) => (
            <li key={i18nKey}>
              <Link
                to={href}
                onClick={handleToggleMenu}
                className={clsxTwMerge(
                  'hover:text-primary-25',
                  activePath === href ? 'text-primary-30' : 'text-gray-50'
                )}
              >
                {t(i18nKey)}
              </Link>
            </li>
          ))}
        </ul>
      </DropdownMenu.Content>
    </DropdownMenu>
  )
}
