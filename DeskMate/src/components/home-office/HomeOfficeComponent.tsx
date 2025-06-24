import { useState } from "react"
import { useHomeOfficeRequests } from "src/hooks/reservation/useHomeOfficeRequests"
import { ReservationRequest } from "src/models/request"
import { useLocalization } from "src/providers/localization/useLocalization"
import { ModuleWrapper } from "../_shared/ModuleWrapper"
import { RequestsList } from "../_shared/RequestsList"
import { HomeOfficeRequestDetails } from "./components/HomeOfficeRequestDetails"

export function HomeOfficeComponent() {
    const { translateText } = useLocalization()
    const { requests, isLoading, isError } = useHomeOfficeRequests()
    const [selectedRequest, setSelectedRequest] = useState<ReservationRequest>()

    return (
        <ModuleWrapper title={translateText(4)} display="flex">
            <RequestsList
                homeOffice
                requests={requests}
                loading={isLoading}
                error={isError}
                selectedRequest={selectedRequest}
                setSelectedRequest={setSelectedRequest}
            />
            <HomeOfficeRequestDetails />
        </ModuleWrapper>
    )
}
