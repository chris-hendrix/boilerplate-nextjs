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
    }),
    updateUser: build.mutation({
      query: (data) => ({
        url: `user/${data?.id}`,
        method: 'PUT',
        body: { ...data, id: undefined }
      }),
      // invalidatesTags: (user) => [{ type: 'User', id: user?.id }],
    })
  })
})

export const { useAddUserMutation, useUpdateUserMutation } = userApi
