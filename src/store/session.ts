import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Session } from 'next-auth'

export const sessionApi = createApi({
  reducerPath: 'sessionApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/auth' }),
  endpoints: (build) => ({
    getSession: build.query<Session, void>({
      query: () => 'session',
    })
  })
})

export const { useGetSessionQuery } = sessionApi
