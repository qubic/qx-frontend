import { EXPLORER_URL } from '@app/constants/urls'

export const makeExplorerTxUrl = (tx: string) => `${EXPLORER_URL}/network/tx/${tx}?type=latest`

export const makeExplorerTickUrl = (tick: string) => `${EXPLORER_URL}/network/tick/${tick}`

export const makeExplorerAddressUrl = (address: string) =>
  `${EXPLORER_URL}/network/address/${address}`
