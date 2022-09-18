import { useState, useCallback } from 'react'
import { myStorage } from './storage'

export const useHttp = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const request = useCallback(async (url, method = 'GET', body = null, headers = {
    'content-type': 'application/json'
  }) => {

    setLoading(true)

    try {
      const dataInStorage = new myStorage(`${url}`)

      if (dataInStorage.isEmpty()) {
        const response = await fetch(url, { method, body, headers });

        if (!response.ok) {
          throw Error(`Could not fetch ${url}, status: ${response.status} `)
        }

        const result = await response.json()

        dataInStorage.set(result)
        return result;

      }
      return dataInStorage.get()

    } catch (error) {
      console.error(error)
      setError(error.message)
      throw error
    } finally {
      setLoading(false)
    }
  }, [])

  const clearError = useCallback(() => {
    setError(null)
  })

  return { request, error, loading, clearError }
}
