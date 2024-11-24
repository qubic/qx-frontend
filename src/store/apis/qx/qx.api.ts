import { envConfig } from '@app/configs'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Asset, IssuedAsset, Trade, Transfer } from './qx.types'

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
    })
  })
})

export const {
  useGetAssetsQuery,
  useGetTradesQuery,
  useGetTransfersQuery,
  useGetIssuedAssetsQuery
} = qxApi
