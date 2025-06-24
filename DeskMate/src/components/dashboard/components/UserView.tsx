import { useState } from "react"
import { RequestsList } from "src/components/_shared/RequestsList"
import { useHomeOfficeRequests } from "src/hooks/reservation/useHomeOfficeRequests"
import { useReservationRequests } from "src/hooks/reservation/useReservationRequests"
import { ReservationRequest } from "src/models/request"

export function UserView() {
    const { requests: homeOffice, isLoading: homeOfficeLoading, isError: homeOfficeError } = useHomeOfficeRequests()
    const { requests, isLoading, isError } = useReservationRequests()
    const [selectedRequest, setSelectedRequest] = useState<ReservationRequest>()
    return (
        <>
            <RequestsList
                homeOffice
                requests={homeOffice}
                loading={homeOfficeLoading}
                error={homeOfficeError}
                selectedRequest={selectedRequest}
                setSelectedRequest={setSelectedRequest}
            />
            <RequestsList
                requests={requests}
                loading={isLoading}
                error={isError}
                selectedRequest={selectedRequest}
                setSelectedRequest={setSelectedRequest}
            />
        </>
    )
}
