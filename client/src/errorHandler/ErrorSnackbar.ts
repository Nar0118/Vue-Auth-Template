import type { ApiError } from './type'

/**
 * A custom function for handling an error.
 *
 * @param e - The response from catch
 *
 * @returns An object with the received status and message from request.
 *
 * @example
 *  try {
      const { data } = await axios.get(`${url}`)

      return data
    } catch (err) {
      return createError(err)
    }
 */
export const errorHandler = (e: any): ApiError => {
  return {
    statusCode: e?.response?.status,
    errorMessage: e?.response?.data?.error || 'Server Error'
  }
}
