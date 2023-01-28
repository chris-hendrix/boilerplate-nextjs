import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { User } from '@prisma/client'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (build) => ({
    addUser: build.mutation<User, Partial<User>>({
      query: (body) => ({
        url: 'user',
        method: 'POST',
        body,
      })
    })
  })
})

export const { useAddUserMutation } = userApi
