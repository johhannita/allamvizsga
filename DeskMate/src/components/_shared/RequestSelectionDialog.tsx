import { Alert, Box, Dialog, Stack, Typography } from "@mui/material"
import { useState } from "react"
import { DatePickerComponent } from "src/components/_shared/DatePickerComponent"
import { FilledAlertButton, FilledButton, OverlinedButton } from "src/components/_shared/styledComponents"
import { additionalInfo } from "src/helpers"
import { useModifyReservationStatusMutation } from "src/hooks/reservation/useModifyReservationStatusMutation"
import { ReservationRequest, ReservationStatus } from "src/models/request"
import { useLocalization } from "src/providers/localization/useLocalization"
import { RequestStatusLabel } from "./RequestStatusLabel"

type Props = {
    open: boolean
    onClose: () => void
    selectedRequest: ReservationRequest
}

export function RequestSelectionDialog({ open, onClose, selectedRequest }: Props) {
    const { translateText } = useLocalization()
    const [cancellationWarning, setCancellationWarning] = useState(false)
    const modifyRequestStatusMutate = useModifyReservationStatusMutation(selectedRequest.startDate)
    const { startDate, endDate, status } = selectedRequest

    const handleCancellationClick = () => {
        setCancellationWarning(true)
    }

    const handleApply = () => {
        modifyRequestStatusMutate.mutate({ reservationId: selectedRequest.id, newStatus: ReservationStatus.Requested })
        onClose()
    }

    const onConfirmCancel = () => {
        modifyRequestStatusMutate.mutate({ reservationId: selectedRequest.id, newStatus: ReservationStatus.Undefined })
        onClose()
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <Box display="flex" flexDirection="column" padding="1rem" width="20em" gap={1}>
                <Box>
                    <Typography variant="overline">{translateText(11)}</Typography>
                    <Box display="flex" gap={1}>
                        <DatePickerComponent selectedDate={startDate} />
                        {endDate && <DatePickerComponent selectedDate={startDate} />}
                    </Box>
                </Box>

                <Box>
                    <Typography variant="overline">{translateText(33)}</Typography>
                    <Typography variant="h6">{additionalInfo(selectedRequest, translateText)}</Typography>
                </Box>

                <Box>
                    <Typography variant="overline">{translateText(35)}</Typography>
                    <RequestStatusLabel status={status} />
                </Box>

                {cancellationWarning ? <Alert severity="warning">{translateText(37)}</Alert> : <Box height="2em" />}
                <Stack direction="row" gap={1}>
                    {cancellationWarning ? (
                        <>
                            <FilledAlertButton onClick={onConfirmCancel}>{translateText(38)}</FilledAlertButton>
                            <OverlinedButton onClick={onClose}>{translateText(34)}</OverlinedButton>
                        </>
                    ) : (
                        <>
                            {status === ReservationStatus.Planned && <FilledButton onClick={handleApply}>{translateText(13)}</FilledButton>}
                            <FilledAlertButton onClick={handleCancellationClick}>{translateText(36)}</FilledAlertButton>
                        </>
                    )}
                </Stack>
            </Box>
        </Dialog>
    )
}
