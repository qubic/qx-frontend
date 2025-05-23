import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { EntityLink } from '@app/components/ui/links'
import type { QubicAccount } from '@app/services/wallet-connect-client'
import { formatString } from '@app/utils'

import AccountActions from './AccountActions'

type Props = {
  title: string
  accounts: QubicAccount[]
  type: 'ConnectedAccounts' | 'AvailableAccounts'
  isConnectedAccount: boolean
  onConnect: (account: QubicAccount) => void
  onDisconnect: () => void
  onToggleDropdown: () => void
}

export default function AccountsSection({
  title,
  accounts,
  type,
  isConnectedAccount,
  onConnect,
  onDisconnect,
  onToggleDropdown
}: Props) {
  const { t } = useTranslation()

  const renderContent = useCallback(() => {
    if (accounts.length === 0 && type === 'AvailableAccounts') {
      return <div className="text-xs text-slate-500">{t('global.no_additional_accounts')}</div>
    }

    return accounts.map((account) => (
      <div
        key={account.address}
        className="flex items-start justify-between gap-32 whitespace-nowrap"
      >
        <div>
          <div className="flex items-center">
            <button type="button" onClick={onToggleDropdown}>
              <EntityLink value={account.address} ellipsis className="text-sm sm:text-sm" />
            </button>

            <span className="mx-10 w-fit rounded bg-slate-50 px-6 py-1 text-xs text-slate-500">
              {account.name}
            </span>
          </div>
          {account.amount !== -1 && (
            <p className="mt-4 text-xs text-slate-500">{formatString(account.amount)} QUBIC</p>
          )}
        </div>

        <AccountActions
          address={account.address}
          isConnected={isConnectedAccount}
          onConnect={() => onConnect(account)}
          onDisconnect={onDisconnect}
        />
      </div>
    ))
  }, [accounts, isConnectedAccount, onConnect, onDisconnect, onToggleDropdown, t, type])

  return (
    <section className="space-y-10">
      <h2 className="text-white">{title}</h2>

      {renderContent()}
    </section>
  )
}
