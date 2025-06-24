import { Dayjs } from "dayjs"
import { Space } from "src/models/space"
import { getServiceUrl } from "../helpers/getServiceUrl"
import httpClient from "../httpClient"

export const getSpaces = (date: Dayjs) => {
    const url = `${getServiceUrl()}/Reservation/GetSpacesForReservation`
    const body = { reservationDate: date.format("YYYY-MM-DD") }

    return httpClient<{ spaces: Space[] }>({ url, method: "POST", body })
}
