import { Alert } from "@mui/material"
import { useLocalization } from "src/providers/localization/useLocalization"

export function LoadingError() {
    const { translateText } = useLocalization()
    return <Alert severity="error">{translateText(31)}</Alert>
}
