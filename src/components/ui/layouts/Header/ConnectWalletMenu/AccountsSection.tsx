import { EntityLink } from '@app/components/ui/links'
import type { QubicAccount } from '@app/services/wallet-connect-client'
import { formatString } from '@app/utils'

import AccountActions from './AccountActions'

type Props = {
  title: string
  accounts: QubicAccount[]
  isConnectedAccount: boolean
  onConnect: (account: QubicAccount) => void
  onDisconnect: () => void
}

export default function AccountsSection({
  title,
  accounts,
  isConnectedAccount,
  onConnect,
  onDisconnect
}: Props) {
  return (
    <section className="space-y-10">
      <h2 className="text-white">{title}</h2>

      {accounts.map((account) => (
        <div
          key={account.address}
          className="flex items-start justify-between gap-32 whitespace-nowrap"
        >
          <div>
            <div className="flex items-center">
              <EntityLink value={account.address} ellipsis className="text-sm sm:text-sm" />

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
      ))}
    </section>
  )
}
