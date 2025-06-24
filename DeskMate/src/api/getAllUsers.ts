import { UserData } from "src/models/user"
import { getServiceUrl } from "./helpers/getServiceUrl"
import httpClient from "./httpClient"

export const getAllUsers = async () => {
    const url = `${getServiceUrl()}/User`

    const resp = await httpClient<{ users: UserData[] }>({ url, method: "GET" })
    return resp.users
}
