import { authStoreActions, useDeskMateStore } from "src/store"

export type Request = { url: string } & (
    | {
          method: "GET"
          headers?: Record<string, string>
      }
    | {
          method: "POST" | "PATCH" | "PUT"
          body: BodyInit | null | string | object
          headers?: Record<string, string>
      }
)

export const httpClient = async <T>(request: Request) => {
    const { url, method, headers } = request
    const { auth } = useDeskMateStore.getState()
    const token = `Bearer ${auth.token}`

    let options: RequestInit

    switch (method) {
        case "POST":
        case "PATCH":
        case "PUT":
            const { body } = request
            options = {
                method,
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json",
                    Authorization: token,
                    ...headers,
                },
                body: JSON.stringify(body),
            }
            break

        case "GET":
        default:
            options = {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    Authorization: token,
                    ...headers,
                },
            }
            break
    }

    if (token) {
        try {
            const response = await fetch(url, options)
            if (response.status === 401) {
                authStoreActions.setIsUnauthorized()
            }

            if (!response.ok) {
                // Handle non-2xx response (e.g., 404, 500, etc.)
                throw new Error(`Request failed with status ${response.status}`)
            }
            return response.json() as unknown as T
        } catch (error) {
            // Handle network errors or errors thrown above.
            // eslint-disable-next-line no-console
            console.error("Request failed:", error)
            throw error
        }
    }

    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject(`Token is empty at: ${url}`)
}

export default httpClient

