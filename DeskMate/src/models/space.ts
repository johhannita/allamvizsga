import { ReservationStatus } from "./request"

export type Priority = "web" | "mobile" | "dev-services" | "tester"
export enum SpaceType {
    Desk = 1,
    MeetingRoom = 2,
    Relax = 3,
    Unused = 4,
}

export type Space = {
    id: string
    x: number
    y: number
    spanX?: string
    spanY?: string
    label: string
    priority?: Priority
    type: SpaceType

    status?: ReservationStatus
    reservedBy?: string
    reservedById?: string
}
