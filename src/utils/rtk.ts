import type { SerializedError } from '@reduxjs/toolkit'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'

/**
 * Formats RTK Query errors into a human-readable message.
 *
 * @param error - The error object returned by RTK Query, which can be of type `FetchBaseQueryError`, `SerializedError`, or `undefined`.
 * @returns A formatted error message string to provide user-friendly feedback.
 */
// eslint-disable-next-line import/prefer-default-export -- Remove this comment when adding more functions
export function formatRTKError(error: FetchBaseQueryError | SerializedError | undefined): string {
  if (!error) {
    return 'An unknown error occurred'
  }

  if ('status' in error) {
    if (typeof error.data === 'object' && error.data !== null) {
      const { message } = error.data as { message?: string }
      return message || 'An error occurred while processing your request'
    }
    return `Error ${error.status}: ${JSON.stringify(error.data) || 'Unknown error'}`
  }

  return 'An unexpected error occurred'
}
