import DesktopWindowsOutlinedIcon from "@mui/icons-material/DesktopWindowsOutlined"
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined"
import NoMeetingRoomIcon from "@mui/icons-material/NoMeetingRoom"
import SelfImprovementOutlinedIcon from "@mui/icons-material/SelfImprovementOutlined"
import { IconButton, styled, Tooltip } from "@mui/material"
import { ReservationStatus } from "src/models/request"
import { Space, SpaceType } from "src/models/space"
import { useLocalization } from "src/providers/localization/useLocalization"

type Props = {
    space: Space
    unavailable?: boolean
}

export function OfficeSpaceComponent({ space, unavailable }: Props) {
    const { translateText } = useLocalization()

    const getElementIcon = (type: SpaceType) => {
        switch (type) {
            case SpaceType.Desk:
                return <DesktopWindowsOutlinedIcon />
            case SpaceType.Relax:
                return <SelfImprovementOutlinedIcon />
            case SpaceType.MeetingRoom:
                return <Groups2OutlinedIcon />
            case SpaceType.Unused:
                return <NoMeetingRoomIcon />
            default:
                break
        }
    }

    const renderTooltip = () => {
        if (space.status === ReservationStatus.Requested || space.status === ReservationStatus.Reserved) {
            return `${translateText(15)} ${space.reservedBy}`
        }
        if (space.status === ReservationStatus.Undefined) {
            return translateText(16)
        }
        return null
    }
    return (
        <Tooltip title={renderTooltip()} arrow enterDelay={500}>
            <span>
                <Desk disabled={space.status !== ReservationStatus.Free || unavailable} status={space.status}>
                    {getElementIcon(space.type)}
                    {space.label}
                </Desk>
            </span>
        </Tooltip>
    )
}

const Desk = styled(IconButton, {
    shouldForwardProp: (prop) => prop !== "status",
})<{ status?: ReservationStatus }>(({ theme, status }) => {
    let bg = theme.palette.grey[300]
    let bgHover = theme.palette.grey?.[200]
    if (status === ReservationStatus.Reserved) {
        bgHover = theme.palette.primary.main
    }
    if (status === ReservationStatus.Requested) {
        bgHover = `repeating-linear-gradient(
          135deg,
          ${theme.palette.primary.main},
          ${theme.palette.primary.main} 20px,
          white 20px,
          white 40px
        )`
    }
    if (status === ReservationStatus.Free) {
        bg = theme.palette.success.main
        bgHover = theme.palette.success.dark
    }

    return {
        background: bg,
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: "center",
        color: theme.palette.text.secondary,
        minHeight: "100%",
        minWidth: "100%",
        display: "flex",
        flexDirection: "column",
        "&.Mui-disabled": {
            background: bgHover,
        },
        ":hover": {
            background: bgHover,
        },
    }
})
