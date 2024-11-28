export enum FeatureFlag {
  CONNECT_WALLET = 'CONNECT_WALLET'
}

const FEATURE_FLAGS: Record<FeatureFlag, boolean> = {
  [FeatureFlag.CONNECT_WALLET]: false
}

export const isFeatureEnabled = (flag: FeatureFlag): boolean => FEATURE_FLAGS[flag] || false

export const isConnectWalletEnabled = isFeatureEnabled(FeatureFlag.CONNECT_WALLET)
