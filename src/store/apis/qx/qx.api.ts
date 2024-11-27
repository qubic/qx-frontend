import { envConfig } from '@app/configs'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type {
  Asset,
  AssetOrder,
  AveragePrice,
  EntityOrder,
  IssuedAsset,
  Trade,
  Transfer
} from './qx.types'

const BASE_URL = `${envConfig.QX_API_URL}/v1/qx`

export const qxApi = createApi({
  reducerPath: 'qxApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    getAssets: build.query<Asset[], void>({
      query: () => '/assets'
    }),
    getTrades: build.query<Trade[], void>({
      query: () => '/trades'
    }),
    getTransfers: build.query<Transfer[], void>({
      query: () => '/transfers'
    }),
    getIssuedAssets: build.query<IssuedAsset[], void>({
      query: () => '/issued-assets'
    }),
    // Entity endpoints
    getEntityAskOrders: build.query<EntityOrder[], { entity: string }>({
      query: ({ entity }) => `/entity/${entity}/asks`
    }),
    getEntityBidOrders: build.query<EntityOrder[], { entity: string }>({
      query: ({ entity }) => `/entity/${entity}/bids`
    }),
    getEntityTrades: build.query<Trade[], { entity: string }>({
      query: ({ entity }) => `/entity/${entity}/trades`
    }),
    getEntityTransfers: build.query<Transfer[], { entity: string }>({
      query: ({ entity }) => `/entity/${entity}/transfers`
    }),
    // Asset endpoints
    getAssetAskOrders: build.query<AssetOrder[], { issuer: string; asset: string }>({
      query: ({ issuer, asset }) => `/issuer/${issuer}/asset/${asset}/asks`
    }),
    getAssetBidOrders: build.query<AssetOrder[], { issuer: string; asset: string }>({
      query: ({ issuer, asset }) => `/issuer/${issuer}/asset/${asset}/bids`
    }),
    getAssetTrades: build.query<Trade[], { issuer: string; asset: string }>({
      query: ({ issuer, asset }) => `/issuer/${issuer}/asset/${asset}/trades`
    }),
    getAssetTransfers: build.query<Transfer[], { issuer: string; asset: string }>({
      query: ({ issuer, asset }) => `/issuer/${issuer}/asset/${asset}/transfers`
    }),
    getAssetChartAveragePrice: build.query<AveragePrice[], { issuer: string; asset: string }>({
      query: ({ issuer, asset }) => `/issuer/${issuer}/asset/${asset}/chart/average-price`
    })
  })
})

export const {
  useGetAssetsQuery,
  useGetTradesQuery,
  useGetTransfersQuery,
  useGetIssuedAssetsQuery,
  // Entity hooks
  useGetEntityAskOrdersQuery,
  useGetEntityBidOrdersQuery,
  useGetEntityTradesQuery,
  useGetEntityTransfersQuery,
  // Asset hooks
  useGetAssetAskOrdersQuery,
  useGetAssetBidOrdersQuery,
  useGetAssetTradesQuery,
  useGetAssetTransfersQuery,
  useGetAssetChartAveragePriceQuery
} = qxApi
