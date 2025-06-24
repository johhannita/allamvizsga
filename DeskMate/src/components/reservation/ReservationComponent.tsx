import { useState } from "react"
import { useReservationRequests } from "src/hooks/reservation/useReservationRequests"
import { ReservationRequest } from "src/models/request"
import { useLocalization } from "src/providers/localization/useLocalization"
import { ModuleWrapper } from "../_shared/ModuleWrapper"
import { RequestsList } from "../_shared/RequestsList"
import { OfficeMap } from "./components/OfficeMap"

export function ReservationComponent() {
    const { translateText } = useLocalization()
    const { requests, isLoading, isError } = useReservationRequests()
    const [selectedRequest, setSelectedRequest] = useState<ReservationRequest>()

    return (
        <ModuleWrapper title={translateText(3)} display="flex">
            <RequestsList
                requests={requests}
                loading={isLoading}
                error={isError}
                selectedRequest={selectedRequest}
                setSelectedRequest={setSelectedRequest}
            />
            <OfficeMap />
        </ModuleWrapper>
    )
}
