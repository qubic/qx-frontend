import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { envConfig } from '@app/configs'

import type {
  Asset,
  AssetOrder,
  AssetOrderPathParams,
  AssetOrderPayload,
  AveragePrice,
  EntityOrder,
  GenAssetOrderPayload,
  IssuedAsset,
  Trade,
  Transfer
} from './qx.types'

const BASE_URL = `${envConfig.QX_API_URL}/v1/qx`

export const qxApi = createApi({
  reducerPath: 'qxApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    // QUERIES
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
    getAssetAskOrders: build.query<AssetOrder[], AssetOrderPathParams>({
      query: ({ issuer, asset }) => `/issuer/${issuer}/asset/${asset}/asks?aggregated=true`
    }),
    getAssetBidOrders: build.query<AssetOrder[], AssetOrderPathParams>({
      query: ({ issuer, asset }) => `/issuer/${issuer}/asset/${asset}/bids?aggregated=true`
    }),
    getAssetTrades: build.query<Trade[], AssetOrderPathParams>({
      query: ({ issuer, asset }) => `/issuer/${issuer}/asset/${asset}/trades`
    }),
    getAssetTransfers: build.query<Transfer[], AssetOrderPathParams>({
      query: ({ issuer, asset }) => `/issuer/${issuer}/asset/${asset}/transfers`
    }),
    getAssetChartAveragePrice: build.query<AveragePrice[], AssetOrderPathParams>({
      query: ({ issuer, asset }) => `/issuer/${issuer}/asset/${asset}/chart/average-price`
    }),
    // MUTATIONS
    addAssetAskOrder: build.mutation<
      AssetOrderPayload,
      { path: AssetOrderPathParams; payload: GenAssetOrderPayload }
    >({
      query: ({ path, payload }) => ({
        url: `/issuer/${path.issuer}/asset/${path.asset}/add-ask`,
        method: 'POST',
        body: payload
      })
    }),
    addAssetBidOrder: build.mutation<
      AssetOrderPayload,
      { path: AssetOrderPathParams; payload: GenAssetOrderPayload }
    >({
      query: ({ path, payload }) => ({
        url: `/issuer/${path.issuer}/asset/${path.asset}/add-bid`,
        method: 'POST',
        body: payload
      })
    }),
    removeAssetAskOrder: build.mutation<
      AssetOrderPayload,
      { path: AssetOrderPathParams; payload: GenAssetOrderPayload }
    >({
      query: ({ path, payload }) => ({
        url: `/issuer/${path.issuer}/asset/${path.asset}/remove-ask`,
        method: 'POST',
        body: payload
      })
    }),
    removeAssetBidOrder: build.mutation<
      AssetOrderPayload,
      { path: AssetOrderPathParams; payload: GenAssetOrderPayload }
    >({
      query: ({ path, payload }) => ({
        url: `/issuer/${path.issuer}/asset/${path.asset}/remove-bid`,
        method: 'POST',
        body: payload
      })
    })
  })
})

export const {
  // QUERIES
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
  useGetAssetChartAveragePriceQuery,
  // MUTATIONS
  useAddAssetAskOrderMutation,
  useAddAssetBidOrderMutation,
  useRemoveAssetAskOrderMutation,
  useRemoveAssetBidOrderMutation
} = qxApi
