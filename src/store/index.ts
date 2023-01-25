import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import { messageApi } from './message'

const store = configureStore({
  reducer: {
    [messageApi.reducerPath]: messageApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(messageApi.middleware),
})

setupListeners(store.dispatch)

export default store
