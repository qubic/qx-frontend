export type Asset = {
  issuer: string
  name: string
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
  averagePrice: number
  totalAmount: number
}
