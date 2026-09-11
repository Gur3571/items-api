/**
 * API Service Module
 * Handles requests and errors between the React frontend and DRF backend.
 */

const BASE_URL = 'http://127.0.0.1:8000/api'

/** Holds HTTP status codes and DRF field errors. */
export class ApiError extends Error {
  constructor(status, data) {
    super(`Request failed with status ${status}`)
    this.status = status
    this.data = data
  }
}

/** Global fetch wrapper with automatic JSON and error handling. */
async function request(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })

  // 204 has no body; everything else from DRF is JSON
  const data = response.status === 204 ? null : await response.json()

  if (!response.ok) {
    throw new ApiError(response.status, data)
  }
  return data
}

/* --- API Endpoints --- */

/** @returns {Promise<Array>} List of all items */
export const listItems = () => request('/items/')

/** @returns {Promise<Object>} Single item by ID */
export const getItem = (id) => request(`/items/${id}/`)

/** @returns {Promise<Object>} Newly created item */
export const createItem = (body) =>
  request('/items/', { method: 'POST', body: JSON.stringify(body) })

/** @returns {Promise<Object>} Updated item fields */
export const updateItem = (id, body) =>
  request(`/items/${id}/`, { method: 'PATCH', body: JSON.stringify(body) })
