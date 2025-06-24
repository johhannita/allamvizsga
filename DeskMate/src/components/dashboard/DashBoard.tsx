import { ERole } from "src/models/auth"
import { useLocalization } from "src/providers/localization/useLocalization"
import { useDeskMateStore } from "src/store"
import { ModuleWrapper } from "../_shared/ModuleWrapper"
import { AdminView } from "./components/AdminView"
import { UserView } from "./components/UserView"

export function DashBoard() {
    const { translateText } = useLocalization()
    const { selectedRole } = useDeskMateStore()

    return (
        <ModuleWrapper title={translateText(2)} display="flex" gap={2}>
            {selectedRole === ERole.Admin ? <AdminView /> : <UserView />}
        </ModuleWrapper>
    )
}
