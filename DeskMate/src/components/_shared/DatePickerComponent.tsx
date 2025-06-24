import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { Dayjs } from "dayjs"

type Props = {
    selectedDate: Dayjs | null
    onSelect?: (newDate: Dayjs) => void
}
export function DatePickerComponent({ selectedDate, onSelect }: Props) {
    const disableDay = (day: Dayjs) => {
        if (day.day() === 6 || day.day() === 0) {
            return true
        }
        return false
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                disabled={!onSelect}
                shouldDisableDate={disableDay}
                sx={{ width: "15rem", paddingBottom: "1em" }}
                value={selectedDate}
                onChange={(newDate) => onSelect?.(newDate as Dayjs)}
            />
        </LocalizationProvider>
    )
}
