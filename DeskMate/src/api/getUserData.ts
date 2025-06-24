import { UserData } from "src/models/user"
import { getServiceUrl } from "./helpers/getServiceUrl"
import httpClient from "./httpClient"

export const getUserData = async (userId: string) => {
    const url = `${getServiceUrl()}/User/GetUserData`

    const resp = await httpClient<{ userData: UserData }>({ url, method: "POST", body: { userId } })
    return resp.userData
}
