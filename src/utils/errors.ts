/**
 * Extracts a human-readable error message from different error types.
 *
 * @param {unknown} error - The error object to extract a message from.
 * @returns {string} - The extracted error message.
 */
export const extractErrorMessage = (error: unknown): string => {
  if (!error) return 'Unknown error occurred'

  if (error instanceof Error) {
    return error.message || 'An error occurred'
  }

  if (typeof error === 'string') {
    return error.trim() || 'An error occurred'
  }

  if (typeof error === 'object' && error !== null) {
    try {
      return JSON.stringify(error, null, 2) // Pretty-print for better debugging
    } catch {
      return 'Error object could not be serialized'
    }
  }

  return 'Unexpected error type'
}
