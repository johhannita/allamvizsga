import { Box, Dialog, Typography } from "@mui/material"
import { Dayjs } from "dayjs"
import { useState } from "react"
import { DatePickerComponent } from "src/components/_shared/DatePickerComponent"
import { FilledButton, Notes } from "src/components/_shared/styledComponents"
import { useReserveSpaceMutation } from "src/hooks/reservation/useReserveSpaceMutation"
import { Space } from "src/models/space"
import { useLocalization } from "src/providers/localization/useLocalization"
import { useDeskMateStore } from "src/store"

type Props = {
    open: boolean
    onClose: () => void
    selectedSpace: Space
    selectedDate: Dayjs
}

export function ReservationDialog({ open, onClose, selectedSpace, selectedDate }: Props) {
    const { translateText } = useLocalization()
    const [notes, setNotes] = useState("...")
    const reserveSpace = useReserveSpaceMutation()
    const { auth } = useDeskMateStore()

    const onClick = () => {
        reserveSpace.mutate({ userId: auth.id, date: selectedDate, spaceId: selectedSpace.id, notes })
        onClose()
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <Box display="flex" flexDirection="column" padding="1rem">
                <Typography variant="h4" color="primary">{`${translateText(10)} ${selectedSpace.label}`}</Typography>
                <Typography variant="overline">{translateText(11)}</Typography>
                <DatePickerComponent selectedDate={selectedDate} />
                <Typography variant="overline">{translateText(12)}</Typography>
                <Notes
                    value={notes}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setNotes(event.target.value)
                    }}
                />
                {!reserveSpace.isError && !reserveSpace.isLoading && <FilledButton onClick={onClick}>{translateText(13)}</FilledButton>}
            </Box>
        </Dialog>
    )
}
