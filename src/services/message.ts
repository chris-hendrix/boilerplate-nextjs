import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Message } from '@/types'

export const messageApi = createApi({
  reducerPath: 'messageApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Message'],
  endpoints: (build) => ({
    getMessages: build.query<Message[], void>({
      query: () => 'message',
      providesTags: (result) => [
        ...(result || []).map(({ id }) => ({ type: 'Message' as const, id })),
        { type: 'Message', id: 'LIST' }
      ]
    }),
    addMessage: build.mutation<Message, Partial<Message>>({
      query: (body) => ({
        url: 'message',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Message', id: 'LIST' }],
    })
  })
})

export const { useGetMessagesQuery, useAddMessageMutation } = messageApi
