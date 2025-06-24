import { ReservationRequest } from "src/models/request"
import { getServiceUrl } from "../helpers/getServiceUrl"
import httpClient from "../httpClient"
import { mapReservationRequestsResp } from "../mappers/mapRequestsResp"
import { ReservationRequestResponse } from "./getReservationRequests"

export const getHomeOfficeRequests = async (userId: string) => {
    const url = `${getServiceUrl()}/Reservation/GetHomeOffice`
    const body = { userId }

    const response: ReservationRequest[] = []
    await httpClient<{ homeOfficeRequests: ReservationRequestResponse[] }>({ url, method: "POST", body }).then((resp) =>
        resp.homeOfficeRequests.map((r) => response.push(mapReservationRequestsResp(r))),
    )
    return response
}
