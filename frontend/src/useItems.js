import { useCallback, useEffect, useState } from 'react'
import { listItems } from './api'

/**
 * Custom hook to fetch and manage a list of items from the API.
 * Provides the data array, loading state, error state, and a refetch trigger.
 */
export function useItems() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const fetchItems = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await listItems()
      setItems(data)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [])

  // Automatically fetch items when the component mounts
  useEffect(() => {
    fetchItems()
  }, [fetchItems])

  return { items, loading, error, refetch: fetchItems }
}
