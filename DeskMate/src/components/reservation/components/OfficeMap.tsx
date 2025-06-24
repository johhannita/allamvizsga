import { Box, styled } from "@mui/material"
import dayjs, { Dayjs } from "dayjs"
import { useState } from "react"
import { DatePickerComponent } from "src/components/_shared/DatePickerComponent"
import { ElementWrapper } from "src/components/_shared/ElementWrapper"
import { Loader } from "src/components/_shared/Loader"
import { LoadingError } from "src/components/_shared/LoadingError"
import { useGetSpaces } from "src/hooks/reservation/useGetSpaces"
import { ReservationStatus } from "src/models/request"
import { Space, SpaceType } from "src/models/space"
import { useDeskMateStore } from "src/store"
import { OfficeSpaceComponent } from "./OfficeSpaceComponent"
import { ReservationDialog } from "./ReservationDialog"

export function OfficeMap() {
    const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs().add(1, "day"))
    const [selectedSpace, setSelectedSpace] = useState<Space | null>()
    const { spaces, isError, isLoading } = useGetSpaces(selectedDate)
    const { auth } = useDeskMateStore()

    const pastSelection = selectedDate <= dayjs()
    const alreadyReserved = spaces.some((space) => space.reservedById === auth.id)
    const availableForReservation = (space: Space) => {
        return space.type === SpaceType.Desk && space.status === ReservationStatus.Free && !pastSelection && !alreadyReserved
    }

    const onSelectSpace = (space: Space) => {
        setSelectedSpace(space)
    }

    const resetSelection = () => {
        setSelectedSpace(null)
    }
    return (
        <ElementWrapper marginLeft="0.5em">
            {selectedSpace && selectedDate && (
                <ReservationDialog selectedSpace={selectedSpace} selectedDate={selectedDate} open={!!selectedSpace} onClose={resetSelection} />
            )}
            <DatePickerComponent selectedDate={selectedDate} onSelect={setSelectedDate} />

            <GridBox isLoaded={!isLoading && !isError && !!spaces.length}>
                {isLoading && <Loader />}
                {isError && <LoadingError />}
                {!isLoading &&
                    !isError &&
                    spaces?.map((space) => {
                        return (
                            <Box
                                key={space.id}
                                sx={{ gridColumn: space.spanX ? space.spanX : space.x, gridRow: space.spanY ? space.spanY : space.y }}
                                onClick={() => availableForReservation(space) && onSelectSpace(space)}
                            >
                                <OfficeSpaceComponent space={space} unavailable={space.type !== SpaceType.Desk || pastSelection || alreadyReserved} />
                            </Box>
                        )
                    })}
            </GridBox>
        </ElementWrapper>
    )
}

const GridBox = styled(Box, {
    shouldForwardProp: (prop) => prop !== "isLoaded",
})<{ isLoaded?: boolean }>(({ isLoaded }) => ({
    ...(isLoaded && {
        display: "grid",
        gridTemplateColumns: "repeat(30, 1fr)",
        gridTemplateRows: "repeat(5, 1fr)",
        gap: 1,
    }),
    height: "90%",
    backgroundImage:
        "linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px)",
    backgroundSize: "20px 20px",
}))
