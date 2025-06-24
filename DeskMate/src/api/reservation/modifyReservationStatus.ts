import { ReservationStatus } from "src/models/request"
import { getServiceUrl } from "../helpers/getServiceUrl"
import httpClient from "../httpClient"

export type ModifyReservationStatusReq = {
    reservationId: string
    newStatus: ReservationStatus
}

export const modifyReservationStatus = async (req: ModifyReservationStatusReq) => {
    const url = `${getServiceUrl()}/Reservation/ModifyReservationStatus`

    return httpClient<{ response: string }>({ url, method: "POST", body: req })
}
