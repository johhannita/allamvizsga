import dayjs from "dayjs"
import { ReservationRequest } from "src/models/request"
import { ReservationRequestResponse } from "../reservation/getReservationRequests"

export const mapReservationRequestsResp = (request: ReservationRequestResponse): ReservationRequest => {
    return {
        id: request.id,
        startDate: dayjs(request.startDate),
        endDate: request.endDate ? dayjs(request.endDate) : undefined,
        status: request.status,
        label: request.label || "",
        notes: request.notes,
        reservedBy: request.reservedBy,
    }
}
