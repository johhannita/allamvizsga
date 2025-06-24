import DeskIcon from "@mui/icons-material/Desk"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import MenuIcon from "@mui/icons-material/Menu"
import MenuOpenIcon from "@mui/icons-material/MenuOpen"
import { Box, IconButton, MenuItem, Select, SelectChangeEvent, Stack, styled, Typography } from "@mui/material"
import { useState } from "react"
import { additionalInfo, requestStatuses } from "src/helpers"
import { ERole } from "src/models/auth"
import { ReservationRequest, ReservationStatus } from "src/models/request"
import { useLocalization } from "src/providers/localization/useLocalization"
import { useDeskMateStore } from "src/store"
import { ElementWrapper } from "./ElementWrapper"
import { Loader } from "./Loader"
import { LoadingError } from "./LoadingError"
import { RequestSelectionDialog } from "./RequestSelectionDialog"
import { RequestStatusChangeDialog } from "./RequestStatusChangeDialog"
import { RequestStatusLabel } from "./RequestStatusLabel"

type Props = {
    requests: ReservationRequest[]
    loading?: boolean
    error?: boolean
    homeOffice?: boolean
    selectedRequest: ReservationRequest | undefined
    setSelectedRequest: React.Dispatch<React.SetStateAction<ReservationRequest | undefined>>
    width?: string
}
export function RequestsList({ requests, loading, error, homeOffice, selectedRequest, setSelectedRequest, width }: Props) {
    const { translateText } = useLocalization()
    const { selectedRole } = useDeskMateStore()
    const [selectedStatus, setSelectedStatus] = useState<ReservationStatus>(ReservationStatus.Undefined)
    const [listCollapsed, setListCollapsed] = useState(false)

    const statuses = requestStatuses(homeOffice)
    const requestsToDisplay = selectedStatus !== ReservationStatus.Undefined ? requests?.filter((req) => req.status === selectedStatus) : requests

    const handleSelectStatus = (status: SelectChangeEvent<number>) => {
        setSelectedStatus(status.target.value as ReservationStatus)
    }

    const handleSelectReq = (req: ReservationRequest) => {
        setSelectedRequest(req)
    }

    const clearSelection = () => {
        setSelectedRequest(undefined)
    }

    function handleCollapse() {
        setListCollapsed((prev) => !prev)
    }

    const timePeriod = (req: ReservationRequest) => {
        if (req.endDate) {
            return `${req.startDate.format("dd, DD.MM.YY")} - ${req.endDate.format("dd, DD.MM.YY")}`
        }

        return req.startDate.format("dd, DD.MM.YY")
    }

    const title = () => {
        if (selectedRole === ERole.Admin) {
            return translateText(44)
        }
        return translateText(homeOffice ? 41 : 14)
    }

    const reservedByUser = (req: ReservationRequest) => {
        return `${translateText(49)} ${req.reservedBy?.firstName} ${req.reservedBy?.lastName}`
    }

    return (
        <>
            {selectedRequest && selectedRole === ERole.User && (
                <RequestSelectionDialog selectedRequest={selectedRequest} open={!!selectedRequest} onClose={clearSelection} />
            )}
            {selectedRequest && selectedRole === ERole.Admin && (
                <RequestStatusChangeDialog selectedRequest={selectedRequest} open={!!selectedRequest} onClose={clearSelection} />
            )}
            <ElementWrapper
                width={width || (listCollapsed ? "10%" : "30%")}
                title={title()}
                titleElement={
                    !homeOffice && !width ? (
                        <IconButton color="primary" onClickCapture={() => handleCollapse()}>
                            {listCollapsed ? <MenuIcon /> : <MenuOpenIcon />}
                        </IconButton>
                    ) : undefined
                }
            >
                {!width && (
                    <Select
                        value={selectedStatus}
                        onChange={handleSelectStatus}
                        IconComponent={KeyboardArrowDownIcon}
                        SelectDisplayProps={{
                            style: { padding: "0.5em" },
                        }}
                        style={{ width: "10em", margin: "0 0.5em" }}
                    >
                        {statuses.map((status) => (
                            <MenuItem key={status.status} value={status.status}>
                                {translateText(status.translationId)}
                            </MenuItem>
                        ))}
                    </Select>
                )}
                {loading && <Loader />}
                {error && <LoadingError />}
                {!loading && !error && !!requests.length && (
                    <ListContainer>
                        {/* {homeOffice && (
                            <ListItem display="flex" alignItems="center">
                                <AddCircleOutlineIcon fontSize="large" sx={{ marginRight: "0.5em" }} />
                                <Typography>{translateText(22)}</Typography>
                            </ListItem>
                        )} */}
                        {requestsToDisplay?.map((req) => {
                            return (
                                <ListItem
                                    key={req.id}
                                    onClick={() => handleSelectReq(req)}
                                    selected={selectedRequest?.id === req.id}
                                    reservation={!req.endDate}
                                >
                                    <Box display="flex" justifyContent="space-between">
                                        <Typography>{timePeriod(req)}</Typography>
                                        <Stack direction="row" gap={5}>
                                            {req.reservedBy && <Typography>{reservedByUser(req)}</Typography>}
                                            {!listCollapsed && <Typography>{additionalInfo(req, translateText)}</Typography>}
                                        </Stack>
                                    </Box>
                                    <RequestStatusLabel status={req.status} />
                                    {req.label && <DeskIcon />}
                                </ListItem>
                            )
                        })}
                    </ListContainer>
                )}
            </ElementWrapper>
        </>
    )
}

const ListItem = styled(Box, {
    shouldForwardProp: (prop) => prop !== "selected" && prop !== "reservation",
})<{ selected?: boolean; reservation?: boolean }>(({ theme, selected, reservation }) => ({
    padding: "1em",
    borderBottom: "1px solid grey",
    backgroundColor: selected ? theme.palette.grey[400] : reservation ? theme.palette.grey[200] : "unset",
    ":hover": {
        cursor: "pointer",
        backgroundColor: theme.palette.grey[300],
    },
}))

const ListContainer = styled(Box)({
    maxHeight: "80%",
    overflowY: "scroll",
    margin: "0.5em",
})
