import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import type { SessionTypes } from '@walletconnect/types'

import type { QubicAccount } from '@app/services/wallet-connect-client'
import { WalletConnectClient } from '@app/services/wallet-connect-client'
import { extractErrorMessage } from '@app/utils/errors'
import { LogFeature, makeLog } from '@app/utils/logger'

import { createWalletConnectListeners, removeWalletConnectListeners } from './wallet-connect-events'
import { WalletConnectContext, WalletConnectionStatus } from './WalletConnectContext'

const log = makeLog(LogFeature.WALLET_CONNECT_CONTEXT)

const walletClient = new WalletConnectClient()

export default function WalletConnectProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<SessionTypes.Struct | null>(null)
  const [wcUri, setWcUri] = useState<string>('')
  const [status, setStatus] = useState<WalletConnectionStatus>(WalletConnectionStatus.IDLE)
  const [accounts, setAccounts] = useState<QubicAccount[]>([])
  const [selectedAccount, setSelectedAccount] = useState<QubicAccount | null>(null)

  const isWalletConnected = useMemo(() => !!session && accounts.length > 0, [session, accounts])

  const statusRef = useRef(status)
  const sessionRef = useRef(session)

  statusRef.current = status
  sessionRef.current = session

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
      // Making sure that uri is empty before connecting
      setWcUri('')
      updateStatus(WalletConnectionStatus.CONNECTING)

      const { uri } = await walletClient.genConnectUrl()

      setWcUri(uri)

      const newSession = await walletClient.makeAprove()

      setSession(newSession)

      updateStatus(WalletConnectionStatus.REQUESTING_ACCOUNTS)
      const requestedAccounts = await walletClient.requestAccounts()

      setAccounts(requestedAccounts)
      updateStatus(WalletConnectionStatus.CONNECTED)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Connection Error:', error)

      const errorMessage = extractErrorMessage(error)
      if (errorMessage.includes('Proposal expired')) {
        updateStatus(WalletConnectionStatus.PROPOSAL_EXPIRED)
      } else if (error && typeof error === 'object' && 'code' in error && error.code === 5000) {
        updateStatus(WalletConnectionStatus.USER_REJECTED_CONNECTION)
      } else {
        updateStatus(WalletConnectionStatus.ERROR)
      }
    } finally {
      setWcUri('')
    }
  }, [updateStatus])

  const disconnect = useCallback(async () => {
    try {
      if (!sessionRef.current) {
        throw new Error('No active session to disconnect')
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
  }, [updateStatus])

  useEffect(() => {
    const initWalletClient = async () => {
      await walletClient.initClient(
        createWalletConnectListeners({
          updateStatus,
          disconnect,
          walletClient,
          statusRef,
          setAccounts
        })
      )

      const restoredSession = await walletClient.restoreSession()

      if (restoredSession) {
        log('Restored session:', restoredSession)
        setSession(restoredSession)
        const requestedAccounts = await walletClient.requestAccounts()
        setAccounts(requestedAccounts)
        setSelectedAccount(requestedAccounts[0])
      }
    }

    initWalletClient()

    return () => {
      removeWalletConnectListeners(walletClient)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- We only want to run this effect once
  }, [])

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
