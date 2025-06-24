import { alpha, styled, Typography } from "@mui/material"
import { statusName } from "src/helpers"
import { ReservationStatus } from "src/models/request"
import { useLocalization } from "src/providers/localization/useLocalization"

type Props = {
    status: ReservationStatus
}

export function RequestStatusLabel({ status }: Props) {
    const { translateText } = useLocalization()
    return <StyledLabel status={status}>{translateText(statusName(status))}</StyledLabel>
}

const StyledLabel = styled(Typography, {
    shouldForwardProp: (prop) => prop !== "status",
})<Props>(({ theme, status }) => {
    let bg
    if (status === ReservationStatus.Reserved) {
        bg = alpha(theme.palette.success.main, 0.3)
    }
    if (status === ReservationStatus.Requested) {
        bg = `repeating-linear-gradient(
          135deg,
          ${alpha(theme.palette.primary.main, 0.3)},
          ${alpha(theme.palette.primary.main, 0.3)} 20px,
          white 20px,
          white 40px
        )`
    }
    if (status === ReservationStatus.Planned) {
        bg = alpha(theme.palette.warning.main, 0.3)
    }

    return {
        background: bg,
        width: "fit-content",
        borderRadius: "5em",
        padding: "0.25em 0.5em",
    }
})
