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
