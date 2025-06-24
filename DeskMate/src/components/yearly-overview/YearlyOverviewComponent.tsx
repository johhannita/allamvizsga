import { Box } from "@mui/material"
import { useLocalization } from "src/providers/localization/useLocalization"
import { ModuleWrapper } from "../_shared/ModuleWrapper"

export function YearlyOverviewComponent() {
    const { translateText } = useLocalization()
    return (
        <ModuleWrapper title={translateText(5)}>
            <Box />
        </ModuleWrapper>
    )
}
