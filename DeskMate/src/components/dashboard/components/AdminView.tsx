import { useState } from "react"
import { RequestsList } from "src/components/_shared/RequestsList"
import { useGetAllReservations } from "src/hooks/reservation/useGetAllReservations"
import { ReservationRequest } from "src/models/request"

export function AdminView() {
    const { requests, isLoading, isError } = useGetAllReservations()
    const [selectedRequest, setSelectedRequest] = useState<ReservationRequest>()
    return (
        <RequestsList
            requests={requests}
            loading={isLoading}
            error={isError}
            selectedRequest={selectedRequest}
            setSelectedRequest={setSelectedRequest}
            width="60%"
        />
    )
}
