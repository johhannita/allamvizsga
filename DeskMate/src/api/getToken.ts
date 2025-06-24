import { AuthUser } from "src/models/auth"
import { authStoreActions } from "src/store"
import { getServiceUrl } from "./helpers/getServiceUrl"

export const getUserToken = async (email: string, password: string) => {
    const url = `${getServiceUrl()}/User/login`
    const body = {
        email,
        password,
    }

    const options: RequestInit = {
        method: "POST",
        headers: {
            Accept: "*/*",
            "Content-type": "application/json",
        },
        body: JSON.stringify(body),
    }

    try {
        const response = await fetch(url, options)
        if (response.status === 401) {
            authStoreActions.setIsError()
        }

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`)
        }
        return response.json() as AuthUser
    } catch (error) {
        console.error("Request failed:", error)
        throw error
    }
}
