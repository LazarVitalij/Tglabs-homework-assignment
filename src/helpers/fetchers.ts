const ROOT = 'http://localhost:3000/'

export const fetchApi = async <T, B = unknown>(
  url: string,
  method: string,
  body: B | null = null,
  token?: string
): Promise<T> => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  }

  const response = await fetch(`${ROOT}${url}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  })

  if (!response.ok) {
    let errorMessage

    try {
      const errorData = await response.json()
      if (errorData?.message) {
        errorMessage = errorData.message
      }
    } catch (error) {
      throw `HTTP error! Status: ${error}, Unable to parse error response`
    }

    throw errorMessage
  }

  return response.json() as Promise<T>
}

export const fetchGetApi = <T>(url: string, token?: string): Promise<T> =>
  fetchApi<T, never>(url, 'GET', null, token)

export const fetchPostApi = <T, B>(
  url: string,
  body: B,
  token?: string
): Promise<T> => fetchApi<T, B>(url, 'POST', body, token)

export const fetchPutApi = <T, B>(
  url: string,
  body: B,
  token?: string
): Promise<T> => fetchApi<T, B>(url, 'PUT', body, token)

export const fetchDeleteApi = <T, B>(
  url: string,
  body: B | null = null,
  token?: string
): Promise<T> => fetchApi<T, B>(url, 'DELETE', body, token)
