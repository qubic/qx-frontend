import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { DropdownMenu } from '@app/components/ui'
import { ConnectWalletButton } from '@app/components/ui/buttons'
import { useTailwindBreakpoint, useWalletConnect } from '@app/hooks'
import type { QubicAccount } from '@app/services/wallet-connect-client'
import { formatEllipsis } from '@app/utils'
import toaster from '@app/utils/toaster'

import AccountsSection from './AccountsSection'

export default function ConnectWalletMenu() {
  const [showDropdown, setShowDropdown] = useState(false)
  const { t } = useTranslation()
  const { isMobile } = useTailwindBreakpoint()

  const { isWalletConnected, selectedAccount, accounts, disconnect, setSelectedAccount } =
    useWalletConnect()

  const handleDropdownToggle = () => setShowDropdown((prev) => !prev)

  const handleChangeAccount = useCallback(
    (account: QubicAccount) => {
      setSelectedAccount(account)
      handleDropdownToggle()
      toaster.success(
        t('global.account_changed', {
          account: `${formatEllipsis(account.address)} (${account.name})`
        })
      )
    },
    [setSelectedAccount, t]
  )

  const availableAccounts = accounts.filter(
    (account) => account.address !== selectedAccount?.address
  )

  if (!isWalletConnected || !selectedAccount) {
    return (
      <ConnectWalletButton
        className="p-8 sm:px-14 sm:py-10 lg:flex"
        variant={isMobile ? 'text' : 'filled'}
        color="secondary"
        labelClassName="hidden sm:block"
        isMenuOpen={showDropdown}
      />
    )
  }

  return (
    <DropdownMenu show={showDropdown} onToggle={handleDropdownToggle}>
      <DropdownMenu.Trigger
        as={
          <ConnectWalletButton
            size="sm"
            color="secondary"
            variant="outlined"
            labelClassName="hidden lg:block"
            isMenuOpen={showDropdown}
          />
        }
      />
      <DropdownMenu.Content className="top-52 min-w-320 bg-primary-70 ltr:-left-144 sm:ltr:left-auto sm:ltr:right-0 rtl:right-144 sm:rtl:left-0 sm:rtl:right-auto">
        <div className="grid gap-20 p-16">
          <AccountsSection
            title={t('global.selected_account')}
            type="ConnectedAccounts"
            accounts={[selectedAccount]}
            isConnectedAccount={isWalletConnected}
            onConnect={handleChangeAccount}
            onDisconnect={disconnect}
            onToggleDropdown={handleDropdownToggle}
          />
          <AccountsSection
            title={t('global.available_accounts')}
            type="AvailableAccounts"
            accounts={availableAccounts}
            isConnectedAccount={false}
            onConnect={handleChangeAccount}
            onDisconnect={disconnect}
            onToggleDropdown={handleDropdownToggle}
          />
        </div>
      </DropdownMenu.Content>
    </DropdownMenu>
  )
}
