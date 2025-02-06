import { createContext } from 'react'

import type { SessionTypes } from '@walletconnect/types'

import type { QubicAccount, WalletConnectClient } from '@app/services/wallet-connect-client'

export enum WalletConnectionStatus {
  IDLE = 'IDLE',
  CONNECTING = 'CONNECTING',
  CONNECTED = 'CONNECTED',
  PROPOSAL_EXPIRED = 'PROPOSAL_EXPIRED',
  ERROR = 'ERROR'
}

export interface IWalletConnectContext {
  walletClient: WalletConnectClient | null
  session: SessionTypes.Struct | null
  status: WalletConnectionStatus
  wcUri: string
  connect: () => Promise<void>
  disconnect: () => Promise<void>
  accounts: QubicAccount[]
  selectedAccount: QubicAccount | null
  setSelectedAccount: (account: QubicAccount | null) => void
  isWalletConnected: boolean
}

export const WalletConnectContext = createContext<IWalletConnectContext | undefined>(undefined)
