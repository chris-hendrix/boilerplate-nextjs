import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import { messageApi, useGetMessagesQuery, useAddMessageMutation } from './message'
import { userApi, useGetUserQuery, useAddUserMutation, useUpdateUserMutation } from './user'
import { sessionApi, useGetSessionQuery } from './session'
import { storageApi, useGetFileQuery, useUploadFileMutation } from './storage'

const store = configureStore({
  reducer: {
    [messageApi.reducerPath]: messageApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [sessionApi.reducerPath]: sessionApi.reducer,
    [storageApi.reducerPath]: storageApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
    messageApi.middleware,
    userApi.middleware,
    sessionApi.middleware,
    storageApi.middleware
  ]),
  devTools: process.env.NODE_ENV !== 'production'
})

setupListeners(store.dispatch)

export {
  useGetMessagesQuery, useAddMessageMutation,
  useGetUserQuery, useAddUserMutation, useUpdateUserMutation,
  useGetSessionQuery,
  useGetFileQuery, useUploadFileMutation
}

export default store
