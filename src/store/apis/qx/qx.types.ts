export type Asset = {
  issuer: string
  name: string
}

export type AssetOrder = {
  entityId: string
  price: number
  numberOfShares: number
}

export type EntityOrder = {
  issuerId: string
  assetName: string
  price: number
  numberOfShares: number
}

export type Trade = {
  tickTime: string
  transactionHash: string
  taker: string
  maker: string
  issuer: string
  assetName: string
  bid: boolean
  price: number
  numberOfShares: number
}

export type TransferExtraData = {
  issuer: string
  name: string
  newOwner: string
  numberOfShares: number
}

export type Transfer = {
  tickTime: string
  hash: string
  source: string
  amount: number
  tick: number
  extraData: TransferExtraData
  moneyFlew: boolean
}

export type IssuedAssetExtraData = {
  name: string
  numberOfShares: number
  numberOfDecimalPlaces: number
}

export type IssuedAsset = {
  tickTime: string
  hash: string
  source: string
  amount: number
  tick: number
  extraData: IssuedAssetExtraData
  moneyFlew: boolean
}

export type AveragePrice = {
  time: string
  min: number
  max: number
  totalShares: number
  totalAmount: number
  totalTrades: number
  averagePrice: number
}

export interface AssetOrderPathParams {
  issuer: string
  asset: string
}

export interface GenAssetOrderPayload {
  from: string
  pricePerShare: number
  numberOfShares: number
}

export interface AssetOrderPayload {
  currentTick: number
  from: string
  to: string
  inputType: number
  amount: number
  extraData: string
}
