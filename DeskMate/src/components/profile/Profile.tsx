import AccountCircleIcon from "@mui/icons-material/AccountCircle"

import { Stack, Typography } from "@mui/material"
import { removeUserFromLocalStorage } from "src/helpers"
import { ERole } from "src/models/auth"
import { useLocalization } from "src/providers/localization/useLocalization"
import { useDeskMateStore } from "src/store"
import { ElementWrapper } from "../_shared/ElementWrapper"
import { ModuleWrapper } from "../_shared/ModuleWrapper"
import { FilledButton } from "../_shared/styledComponents"

export function Profile() {
    const { translateText } = useLocalization()
    const { auth } = useDeskMateStore()

    const handleLogout = () => {
        removeUserFromLocalStorage()
        window.location.reload()
    }
    return (
        <ModuleWrapper title={translateText(6)} display="flex" gap={2}>
            <ElementWrapper title={translateText(42)} width="30%" height="fit-content">
                <Stack direction="row" alignItems="center" gap={2}>
                    <AccountCircleIcon style={{ fontSize: "5rem" }} />
                    <Stack>
                        <Typography variant="h5">{`${auth.firstName} ${auth.lastName}`}</Typography>
                        <Typography variant="body1">{auth.role === ERole.Admin ? "admin" : "user"}</Typography>
                    </Stack>
                </Stack>
                <Typography variant="h5">{auth.email}</Typography>
                <FilledButton onClick={handleLogout}>{translateText(43)}</FilledButton>
            </ElementWrapper>
        </ModuleWrapper>
    )
}
