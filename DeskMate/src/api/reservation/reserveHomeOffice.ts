import { Dayjs } from "dayjs"
import { ReservationStatus } from "src/models/request"
import { getServiceUrl } from "../helpers/getServiceUrl"
import httpClient from "../httpClient"

export type ReserveHomeOfficeReq = {
    userId: string
    date: Dayjs
    endDate: Dayjs
    status: ReservationStatus
    notes?: string
}

export const reserveHomeOffice = (req: ReserveHomeOfficeReq) => {
    const url = `${getServiceUrl()}/Reservation/ReserveHomeOffice`

    const { userId, date, endDate, status, notes } = req
    const body = { userId, date: date.format("YYYY-MM-DD"), endDate: endDate.format("YYYY-MM-DD"), status, notes }

    return httpClient<{ response: string }>({ url, method: "POST", body })
}
