import { Dayjs } from "dayjs"
import { ReservationRequest } from "src/models/request"
import { getServiceUrl } from "../helpers/getServiceUrl"
import httpClient from "../httpClient"
import { mapReservationRequestsResp } from "../mappers/mapRequestsResp"
import { ReservationRequestResponse } from "./getReservationRequests"

export const getYearlyOverview = async (userId: string, year: Dayjs) => {
    const url = `${getServiceUrl()}/Reservation/GetUserYearlyOverview`
    const body = { userId, year: year.format("YYYY-MM-DD") }

    const response: ReservationRequest[] = []
    await httpClient<{ reservations: ReservationRequestResponse[] }>({ url, method: "POST", body }).then((resp) =>
        resp.reservations.map((r) => response.push(mapReservationRequestsResp(r))),
    )
    return response
}
