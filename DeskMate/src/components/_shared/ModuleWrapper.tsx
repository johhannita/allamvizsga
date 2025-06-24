import { Box, BoxProps, Typography } from "@mui/material"
import { ReactNode } from "react"

type Props = BoxProps & {
    title: ReactNode
    subtitle?: ReactNode
    children: ReactNode
}

export function ModuleWrapper({ title, subtitle, children, display, gap }: Props) {
    return (
        <Box
            display="flex"
            flexDirection="column"
            height="85%"
            sx={{
                backgroundColor: "white",
                m: 2,
                borderRadius: "1em",
                p: "1.5em",
            }}
        >
            <Box display="flex" flexDirection="column" mb={2} marginLeft="0.5em">
                <Typography variant="h4" color="primary">
                    {title}
                </Typography>
                {subtitle !== null && subtitle}
            </Box>
            <Box display={display} gap={gap} height="100%">
                {children}
            </Box>
        </Box>
    )
}
