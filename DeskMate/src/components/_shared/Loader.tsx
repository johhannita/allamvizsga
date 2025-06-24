import { Box, CircularProgress } from "@mui/material"

export function Loader() {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="80%" width="100%">
            <CircularProgress />
        </Box>
    )
}
