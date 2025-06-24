import { Dayjs } from "dayjs"
import { UserData } from "./user"

export enum ReservationStatus {
    Undefined = 0,
    Free = 1,
    Planned = 2,
    Requested = 3,
    Reserved = 4,
}

export type ReservationRequest = {
    id: string
    startDate: Dayjs
    endDate?: Dayjs
    status: ReservationStatus
    label?: string
    notes?: string
    reservedBy?: UserData
}
