import { useState } from "react"
import { useParams } from "react-router-dom"
import { useHomeOfficeRequests } from "src/hooks/reservation/useHomeOfficeRequests"
import { useReservationRequests } from "src/hooks/reservation/useReservationRequests"
import { useGetUserData } from "src/hooks/useGetUserData"
import { ReservationRequest } from "src/models/request"
import { ModuleWrapper } from "../_shared/ModuleWrapper"
import { RequestsList } from "../_shared/RequestsList"

export function UserOverView() {
    const { userId } = useParams<{ userId: string }>()
    const { userData } = useGetUserData(userId)
    const { requests: homeOffice, isLoading: homeOfficeLoading, isError: homeOfficeError } = useHomeOfficeRequests(userId)
    const { requests, isLoading, isError } = useReservationRequests(userId)
    const [selectedRequest, setSelectedRequest] = useState<ReservationRequest>()
    return (
        <ModuleWrapper title={`${userData?.firstName} ${userData?.lastName}`} display="flex" gap={2}>
            <RequestsList
                requests={homeOffice}
                loading={homeOfficeLoading}
                error={homeOfficeError}
                selectedRequest={selectedRequest}
                setSelectedRequest={setSelectedRequest}
                width="45%"
            />
            <RequestsList
                requests={requests}
                loading={isLoading}
                error={isError}
                selectedRequest={selectedRequest}
                setSelectedRequest={setSelectedRequest}
                width="45%"
            />
        </ModuleWrapper>
    )
}
