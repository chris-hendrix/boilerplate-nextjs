import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { User } from '@prisma/client'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['User'],
  endpoints: (build) => ({
    getUser: build.query<User, string>({
      query: (id) => `user/${id}`,
      providesTags: (_result, _err, id) => [{ type: 'User', id }],
    }),
    getUsers: build.query<User[], { skip: number, take: number } | undefined>({
      query: (params) => ({
        url: 'user',
        params
      }),
      providesTags: (result) => [
        ...(result || []).map(({ id }) => ({ type: 'User' as const, id })),
        { type: 'User', id: 'LIST' }
      ]
    }),
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
      invalidatesTags: (user) => [{ type: 'User', id: user?.id }],
    })
  })
})

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useAddUserMutation,
  useUpdateUserMutation
} = userApi
