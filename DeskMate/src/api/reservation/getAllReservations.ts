import { ReservationRequest } from "src/models/request"
import { getServiceUrl } from "../helpers/getServiceUrl"
import httpClient from "../httpClient"
import { mapReservationRequestsResp } from "../mappers/mapRequestsResp"
import { ReservationRequestResponse } from "./getReservationRequests"

export const getAllReservations = async () => {
    const url = `${getServiceUrl()}/Reservation/GetAllReservations`

    const response: ReservationRequest[] = []
    await httpClient<{ reservations: ReservationRequestResponse[] }>({ url, method: "POST", body: {} }).then((resp) =>
        resp.reservations.map((r) => response.push(mapReservationRequestsResp(r))),
    )
    return response
}
