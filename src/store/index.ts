import { configureStore } from '@reduxjs/toolkit'

import { qubicRpcApi } from './apis/qubic-rpc'
import { qxApi } from './apis/qx'
import localeReducer from './localeSlice'
import modalReducer from './modalSlice'

export const store = configureStore({
  reducer: {
    locale: localeReducer,
    modal: modalReducer,
    [qxApi.reducerPath]: qxApi.reducer,
    [qubicRpcApi.reducerPath]: qubicRpcApi.reducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(qxApi.middleware).concat(qubicRpcApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
