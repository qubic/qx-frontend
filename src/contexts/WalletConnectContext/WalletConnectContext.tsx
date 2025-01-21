import { createContext } from 'react'

import type { SessionTypes } from '@walletconnect/types'

import type { QubicAccount, WalletConnectClient } from '@app/services/wallet-connect-client'

export interface IWalletConnectContext {
  walletClient: WalletConnectClient | null
  session: SessionTypes.Struct | null
  wcUri: string
  connect: () => Promise<void>
  disconnect: () => Promise<void>
  loading: boolean
  accounts: QubicAccount[]
  selectedAccount: QubicAccount | null
  setSelectedAccount: (account: QubicAccount | null) => void
  isWalletConnected: boolean
  isComputor: boolean
}

export const WalletConnectContext = createContext<IWalletConnectContext | undefined>(undefined)
