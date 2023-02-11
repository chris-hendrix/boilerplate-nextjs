import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const storageApi = createApi({
  reducerPath: 'storageApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (build) => ({
    getFile: build.query<string, string>({
      query: (path) => ({
        url: `storage?path=${path}`,
        method: 'GET',
        responseHandler: async (res) => URL.createObjectURL(await res.blob())
      }),
    }),
    uploadFile: build.mutation<string, FormData>({
      query: (formData) => ({
        url: 'storage',
        method: 'POST',
        body: formData,
        responseHandler: async (res) => (await res.json())?.path,
      }),
    })
  }),
})

export const { useGetFileQuery, useUploadFileMutation } = storageApi
