import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'
import { SerializedError } from '@reduxjs/toolkit'

// https://redux-toolkit.js.org/rtk-query/usage-with-typescript#type-safe-error-handling
const throwBaseQueryError = (error: FetchBaseQueryError | SerializedError) => {
  if (!error) return
  let errorMessage = null
  if ('status' in error) errorMessage = 'error' in error ? error.error : JSON.stringify(error.data)
  else errorMessage = error.message
  throw new Error(errorMessage)
}

export default throwBaseQueryError
