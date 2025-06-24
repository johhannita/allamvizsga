import { Dayjs } from "dayjs"
import { getServiceUrl } from "../helpers/getServiceUrl"
import httpClient from "../httpClient"

export type ReserveSpaceReq = {
    userId: string
    spaceId: string
    date: Dayjs
    notes?: string
}

export const reserveSpace = (req: ReserveSpaceReq) => {
    const url = `${getServiceUrl()}/Reservation/ReserveSpace`

    const { userId, spaceId, date, notes } = req
    const body = { userId, spaceId, date: date.format("YYYY-MM-DD"), notes }

    return httpClient<{ response: string }>({ url, method: "POST", body })
}
