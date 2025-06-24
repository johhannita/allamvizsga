import { Box, BoxProps, Stack, Typography } from "@mui/material"

type Props = BoxProps & {
    titleElement?: JSX.Element
}

export function ElementWrapper({ titleElement, title, children, width, height, marginLeft, padding, overflow }: Props) {
    return (
        <Box
            display="flex"
            width={width || "100%"}
            marginLeft={marginLeft}
            height={height || "90%"}
            flexDirection="column"
            padding="1em"
            borderRadius="1em"
            border="3px solid lightgrey"
            overflow={overflow}
        >
            {title && (
                <Stack direction="row" justifyContent="space-between">
                    <Typography variant="h5" margin="0.5em">
                        {title}
                    </Typography>
                    {titleElement && titleElement}
                </Stack>
            )}
            <Box padding={padding} height="100%">
                {children}
            </Box>
        </Box>
    )
}
