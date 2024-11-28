type EnvConfig = {
  QX_API_URL: string
  QUBIC_RPC_URL: string
  WALLET_CONNECT_PROJECT_ID: string
  QUBIC_CHAIN_ID: string
  APP_TITLE: string
  APP_DESCRIPTION: string
  APP_URL: string
}

export const envConfig: EnvConfig = {
  QX_API_URL: import.meta.env.VITE_QX_API_URL,
  QUBIC_RPC_URL: import.meta.env.VITE_QUBIC_RPC_URL,
  // Wallet Connect Sign Client Config
  WALLET_CONNECT_PROJECT_ID: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID,
  QUBIC_CHAIN_ID: import.meta.env.VITE_QUBIC_CHAIN_ID,
  APP_TITLE: import.meta.env.VITE_APP_TITLE,
  APP_DESCRIPTION: import.meta.env.VITE_APP_DESCRIPTION,
  APP_URL: import.meta.env.VITE_APP_URL
}

export default envConfig
