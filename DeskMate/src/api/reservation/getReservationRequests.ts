import { ReservationRequest, ReservationStatus } from "src/models/request"
import { UserData } from "src/models/user"
import { getServiceUrl } from "../helpers/getServiceUrl"
import httpClient from "../httpClient"
import { mapReservationRequestsResp } from "../mappers/mapRequestsResp"

export type ReservationRequestResponse = {
    id: string
    startDate: string
    endDate?: string
    status: ReservationStatus
    label?: string
    notes?: string
    reservedBy?: UserData
}

export const getReservationRequests = async (userId: string) => {
    const url = `${getServiceUrl()}/Reservation/GetReservations`
    const body = { userId }

    const response: ReservationRequest[] = []
    await httpClient<{ reservations: ReservationRequestResponse[] }>({ url, method: "POST", body }).then((resp) =>
        resp.reservations.map((r) => response.push(mapReservationRequestsResp(r))),
    )
    return response
}
