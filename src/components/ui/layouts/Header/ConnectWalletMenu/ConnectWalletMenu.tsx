import { useEffect, useRef, useState } from 'react'

import { DropdownMenu } from '@app/components/ui'
import { ConnectWalletButton } from '@app/components/ui/buttons'
import { useWalletConnect } from '@app/hooks'

import AccountsSection from './AccountsSection'

export default function ConnectWalletMenu() {
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [showDropdown, setShowDropdown] = useState(false)

  const { isWalletConnected, selectedAccount, accounts, disconnect, setSelectedAccount } =
    useWalletConnect()

  const handleDropdownToggle = () => setShowDropdown((prev) => !prev)

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setShowDropdown(false)
    }
  }

  const availableAccounts = accounts.filter(
    (account) => account.address !== selectedAccount?.address
  )

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  if (!isWalletConnected || !selectedAccount) {
    return (
      <ConnectWalletButton
        className="px-14 py-10 lg:flex"
        color="secondary"
        labelClassName="hidden sm:block"
      />
    )
  }

  return (
    <DropdownMenu show={showDropdown}>
      <DropdownMenu.Trigger
        onToggle={handleDropdownToggle}
        as={
          <ConnectWalletButton
            size="sm"
            color="secondary"
            variant="outlined"
            labelClassName="hidden sm:block"
            showArrowIcon
          />
        }
      />
      <DropdownMenu.Content className="top-52 min-w-320 bg-primary-70 ltr:!-left-144 sm:ltr:left-auto sm:ltr:right-0 rtl:!right-144">
        <div className="grid gap-20 p-16" ref={dropdownRef}>
          <AccountsSection
            title="Connected Account"
            accounts={[selectedAccount]}
            isConnectedAccount={isWalletConnected}
            onConnect={setSelectedAccount}
            onDisconnect={disconnect}
          />
          <AccountsSection
            title="Available Accounts"
            accounts={availableAccounts}
            isConnectedAccount={false}
            onConnect={setSelectedAccount}
            onDisconnect={disconnect}
          />
        </div>
      </DropdownMenu.Content>
    </DropdownMenu>
  )
}
