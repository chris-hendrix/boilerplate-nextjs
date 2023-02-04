import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import { messageApi } from './message'
import { userApi } from './user'

const store = configureStore({
  reducer: {
    [messageApi.reducerPath]: messageApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
    messageApi.middleware,
    userApi.middleware
  ]),
  devTools: process.env.NODE_ENV !== 'production'
})

setupListeners(store.dispatch)

export default store
