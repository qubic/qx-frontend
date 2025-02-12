import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import type { SessionTypes } from '@walletconnect/types'

import type { QubicAccount, WalletConnectEventListeners } from '@app/services/wallet-connect-client'
import { WalletConnectClient, WalletEvents } from '@app/services/wallet-connect-client'
import { extractErrorMessage } from '@app/utils/errors'
import { LogFeature, makeLog } from '@app/utils/logger'

import { WalletConnectContext, WalletConnectionStatus } from './WalletConnectContext'

const log = makeLog(LogFeature.WALLET_CONNECT_CONTEXT)

export default function WalletConnectProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<SessionTypes.Struct | null>(null)
  const [wcUri, setWcUri] = useState<string>('')
  const [status, setStatus] = useState<WalletConnectionStatus>(WalletConnectionStatus.IDLE)
  const [accounts, setAccounts] = useState<QubicAccount[]>([])
  const [selectedAccount, setSelectedAccount] = useState<QubicAccount | null>(null)

  const walletClient = useRef(new WalletConnectClient()).current
  const isWalletConnected = useMemo(() => !!session && accounts.length > 0, [session, accounts])

  /**
   * Helper function to update the connection status.
   */
  const updateStatus = useCallback((newStatus: WalletConnectionStatus) => {
    setStatus((prevStatus) => {
      log(`Status changed from ${prevStatus} to ${newStatus}`)
      return newStatus
    })
  }, [])

  const connect = useCallback(async () => {
    try {
      if (!walletClient) {
        throw new Error('Wallet client not found')
      }
      // Making sure that uri is empty before connecting
      setWcUri('')
      updateStatus(WalletConnectionStatus.CONNECTING)

      const { uri } = await walletClient.genConnectUrl()

      setWcUri(uri)

      const newSession = await walletClient.makeAprove()

      setSession(newSession)

      const requestedAccounts = await walletClient.requestAccounts()

      setAccounts(requestedAccounts)
      updateStatus(WalletConnectionStatus.CONNECTED)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Connection Error:', error)
      updateStatus(
        extractErrorMessage(error).includes('Proposal expired')
          ? WalletConnectionStatus.PROPOSAL_EXPIRED
          : WalletConnectionStatus.ERROR
      )
    } finally {
      setWcUri('')
    }
  }, [updateStatus, walletClient])

  const disconnect = useCallback(async () => {
    try {
      if (!walletClient || !session) {
        throw new Error('Wallet client or session not found')
      }

      await walletClient.disconnectWallet()

      setSession(null)
      setAccounts([])
      setSelectedAccount(null)
      updateStatus(WalletConnectionStatus.IDLE)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error while trying to disconnect:', error)
    }
  }, [walletClient, session, updateStatus])

  useEffect(() => {
    const initWalletClient = async () => {
      const eventListeners: WalletConnectEventListeners[] = [
        {
          event: 'proposal_expire',
          listener: (payload) => {
            log('proposal_expire', payload)
            if (status !== WalletConnectionStatus.PROPOSAL_EXPIRED) {
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

      await walletClient.initClient(eventListeners)

      const restoredSession = await walletClient.restoreSession()

      if (restoredSession) {
        log('Restored session:', restoredSession)
        setSession(restoredSession)
        const requestedAccounts = await walletClient.requestAccounts()
        setAccounts(requestedAccounts)
      }
    }

    initWalletClient()

    return () => {
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
  }, [status, updateStatus, walletClient])

  const contextValue = useMemo(
    () => ({
      walletClient,
      session,
      status,
      wcUri,
      connect,
      disconnect,
      accounts,
      selectedAccount,
      setSelectedAccount,
      isWalletConnected
    }),
    [
      walletClient,
      session,
      status,
      wcUri,
      connect,
      disconnect,
      accounts,
      selectedAccount,
      setSelectedAccount,
      isWalletConnected
    ]
  )

  log({ session, status, accounts, selectedAccount })

  return (
    <WalletConnectContext.Provider value={contextValue}>{children}</WalletConnectContext.Provider>
  )
}
