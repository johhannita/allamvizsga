import { Dayjs } from "dayjs"
import { ReservationRequest, ReservationStatus } from "src/models/request"

export const additionalInfo = (req: ReservationRequest, translateText: (key: number | string) => string) => {
    if (req.endDate) {
        return `${workingDaysBetween(req.startDate, req.endDate)} ${translateText(21)}`
    }

    return `${translateText(32)} ${req.label}`
}

export function workingDaysBetween(start: Dayjs, end: Dayjs): number {
    const from = start.startOf("day")
    const to = end.startOf("day")

    if (to.isBefore(from)) {
        return 0
    }

    let count = 0
    let cur = from.clone()

    // loop until cur > to
    while (cur.isBefore(to) || cur.isSame(to)) {
        const dow = cur.day()
        if (dow !== 0 && dow !== 6) {
            count++
        }
        cur = cur.add(1, "day")
    }

    return count
}

export type StatusWithLabel = {
    status: ReservationStatus
    translationId: number
}

export const requestStatuses = (homeOffice?: boolean) => {
    const statusList: StatusWithLabel[] = []

    statusList.push({ status: ReservationStatus.Undefined, translationId: statusName(ReservationStatus.Undefined) })
    if (homeOffice) {
        statusList.push({ status: ReservationStatus.Planned, translationId: statusName(ReservationStatus.Planned) })
    }
    statusList.push({ status: ReservationStatus.Requested, translationId: statusName(ReservationStatus.Requested) })
    statusList.push({ status: ReservationStatus.Reserved, translationId: statusName(ReservationStatus.Reserved) })

    return statusList
}

export const statusName = (status: ReservationStatus): number => {
    switch (status) {
        case ReservationStatus.Planned:
            return 18
        case ReservationStatus.Requested:
            return 19
        case ReservationStatus.Reserved:
            return 20
        default:
            return 17
    }
}
