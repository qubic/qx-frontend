import { useContext } from 'react'

import type { IWalletConnectContext } from '@app/contexts'
import { WalletConnectContext } from '@app/contexts'

export default function useWalletConnect(): IWalletConnectContext {
  const context = useContext(WalletConnectContext)
  if (!context) {
    throw new Error('useWalletConnect must be used within a WalletConnectProvider')
  }
  return context
}
