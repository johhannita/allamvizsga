import { Stack, Typography } from "@mui/material"
import dayjs, { Dayjs } from "dayjs"
import { useState } from "react"
import { DatePickerComponent } from "src/components/_shared/DatePickerComponent"
import { FilledButton, Notes, OverlinedButton } from "src/components/_shared/styledComponents"
import { workingDaysBetween } from "src/helpers"
import { useReserveHomeOfficeMutation } from "src/hooks/reservation/useReserveHomeOfficeMutation"
import { ReservationStatus } from "src/models/request"
import { useLocalization } from "src/providers/localization/useLocalization"
import { useDeskMateStore } from "src/store"
import { ElementWrapper } from "../../_shared/ElementWrapper"

export function HomeOfficeRequestDetails() {
    const { translateText } = useLocalization()
    const reserveHomeOffice = useReserveHomeOfficeMutation()
    const { auth } = useDeskMateStore()
    const [startDate, setStartDate] = useState<Dayjs | null>(dayjs().add(1, "day"))
    const [endDate, setEndDate] = useState<Dayjs | null>(startDate)
    const [notes, setNotes] = useState("")

    const resetEntries = () => {
        setStartDate(null)
        setEndDate(null)
        setNotes("")
    }

    const enableActions = () => {
        return startDate && endDate
    }

    const handleSave = () => {
        reserveHomeOffice.mutate({ userId: auth.id, date: startDate!, endDate: endDate!, status: ReservationStatus.Planned, notes })
        resetEntries()
    }

    const handleApply = () => {
        reserveHomeOffice.mutate({ userId: auth.id, date: startDate!, endDate: endDate!, status: ReservationStatus.Requested, notes })
        resetEntries()
    }

    return (
        <ElementWrapper title={translateText(22)} width="65%" height="fit-content" marginLeft="1em" padding="1em">
            <Typography variant="h6">{translateText(23)}</Typography>
            <Stack gap={2} direction="row">
                <DatePickerComponent
                    selectedDate={startDate}
                    onSelect={(value) => {
                        setStartDate(value)
                        setEndDate(value)
                    }}
                />
                <DatePickerComponent selectedDate={endDate} onSelect={setEndDate} />
            </Stack>
            <Typography>{startDate && endDate && `${workingDaysBetween(startDate, endDate)} ${translateText(21)}`}</Typography>
            <Stack marginTop="2em">
                <Typography variant="h6">{translateText(12)}</Typography>
                <Notes
                    value={notes}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setNotes(event.target.value)
                    }}
                />
                <Stack direction="row" gap={1}>
                    <OverlinedButton onClick={handleSave} disabled={!enableActions}>
                        {translateText(26)}
                    </OverlinedButton>
                    <FilledButton onClick={handleApply} disabled={!enableActions}>
                        {translateText(13)}
                    </FilledButton>
                </Stack>
            </Stack>
        </ElementWrapper>
    )
}
