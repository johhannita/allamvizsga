import { Button, styled, TextField, TextFieldProps } from "@mui/material"

export const FilledButton = styled(Button)(({ theme }) => ({
    width: "fit-content",
    marginTop: "1em",
    backgroundColor: theme.palette.primary.main,
    color: "white",
    "&:hover": {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.main,
    },
}))

export const FilledAlertButton = styled(Button)(({ theme }) => ({
    width: "fit-content",
    marginTop: "1em",
    backgroundColor: theme.palette.error.main,
    color: "black",
    "&:hover": {
        backgroundColor: theme.palette.error.dark,
    },
}))

export const OverlinedButton = styled(Button)(({ theme }) => ({
    width: "fit-content",
    marginTop: "1em",
    backgroundColor: "white",
    color: theme.palette.primary.dark,
    border: `1px solid ${theme.palette.primary.dark}`,
    "&:hover": {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.dark,
    },
}))

export const Notes = styled((props: TextFieldProps) => <TextField {...props} multiline rows={4} />)(({ theme }) => ({
    width: "30rem",
    "& textarea": { padding: "0.5rem", color: theme.palette.grey[400] },
}))
