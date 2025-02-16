import {
  type QubicAccount,
  type WalletConnectClient,
  type WalletConnectEventListeners,
  WalletEvents
} from '@app/services/wallet-connect-client'
import { LogFeature, makeLog } from '@app/utils/logger'

import { WalletConnectionStatus } from './WalletConnectContext'

const log = makeLog(LogFeature.WALLET_CONNECT_CONTEXT)

const PROPOSAL_EXPIRE_EXCLUDED_STATUSES = [
  WalletConnectionStatus.PROPOSAL_EXPIRED,
  WalletConnectionStatus.USER_REJECTED_CONNECTION,
  WalletConnectionStatus.ERROR
]

type CreateWalletConnectListenersInput = {
  updateStatus: (status: WalletConnectionStatus) => void
  disconnect: () => void
  walletClient: WalletConnectClient
  statusRef: React.RefObject<WalletConnectionStatus>
  setAccounts: React.Dispatch<React.SetStateAction<QubicAccount[]>>
}

export function createWalletConnectListeners({
  updateStatus,
  disconnect,
  walletClient,
  statusRef,
  setAccounts
}: CreateWalletConnectListenersInput): WalletConnectEventListeners[] {
  return [
    {
      event: 'proposal_expire',
      listener: (payload) => {
        log('proposal_expire', payload)
        if (!PROPOSAL_EXPIRE_EXCLUDED_STATUSES.includes(statusRef.current)) {
          updateStatus(WalletConnectionStatus.PROPOSAL_EXPIRED)
        }
      }
    },
    {
      event: 'session_authenticate',
      listener: (payload) => {
        log('session_authenticate', payload)
      }
    },
    {
      event: 'session_delete',
      listener: (payload) => {
        log('session_delete', payload)
        disconnect()
      }
    },
    {
      event: 'session_event',
      listener: (payload) => {
        log('session_event', payload.params.event.name)
        if (Object.values(WalletEvents).includes(payload.params.event.name as WalletEvents)) {
          walletClient.requestAccounts().then((requestedAccounts) => {
            setAccounts(requestedAccounts)
          })
        }
      }
    },
    {
      event: 'session_expire',
      listener: (payload) => {
        log('session_expire', payload)
        walletClient.clearSession('Session expired', payload)
      }
    },
    {
      event: 'session_extend',
      listener: (payload) => {
        log('session_extend', payload)
      }
    },
    {
      event: 'session_ping',
      listener: (payload) => {
        log('session_ping', payload)
      }
    },
    {
      event: 'session_proposal',
      listener: (payload) => {
        log('session_proposal', payload)
      }
    },
    {
      event: 'session_request',
      listener: (payload) => {
        log('session_request', payload)
      }
    },
    {
      event: 'session_request_expire',
      listener: (payload) => {
        log('session_request_expire', payload)
      }
    },
    {
      event: 'session_request_sent',
      listener: (payload) => {
        log('session_request_sent', payload)
      }
    },
    {
      event: 'session_update',
      listener: (payload) => {
        log('session_update', payload)
      }
    }
  ]
}

export function removeWalletConnectListeners(walletClient: WalletConnectClient) {
  walletClient.removeAllListeners('proposal_expire')
  walletClient.removeAllListeners('session_authenticate')
  walletClient.removeAllListeners('session_delete')
  walletClient.removeAllListeners('session_event')
  walletClient.removeAllListeners('session_expire')
  walletClient.removeAllListeners('session_extend')
  walletClient.removeAllListeners('session_ping')
  walletClient.removeAllListeners('session_proposal')
  walletClient.removeAllListeners('session_request')
  walletClient.removeAllListeners('session_request_expire')
  walletClient.removeAllListeners('session_request_sent')
  walletClient.removeAllListeners('session_update')
}
